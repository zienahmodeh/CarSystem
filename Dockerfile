# Stage 1: Build Angular + .NET
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Install Node.js 22
RUN apt-get update && \
    apt-get install -y curl gnupg build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    node -v && npm -v

# Copy .NET project files
COPY ["Web/Web.csproj", "Web/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["SharedKernel/SharedKernel.csproj", "SharedKernel/"]

# Restore .NET dependencies
RUN dotnet restore "Web/Web.csproj"

# -----------------------------
# Build Angular app
# -----------------------------
WORKDIR /src/Web/Client

COPY ["Web/Client/package.json", "Web/Client/package-lock.json*", "./"]

RUN npm install --legacy-peer-deps

COPY Web/Client/ .

RUN npm run build:prod

RUN mkdir -p /src/Web/wwwroot && cp -r dist/* /src/Web/wwwroot/

# -----------------------------
# Copy remaining source code for .NET build
# -----------------------------
COPY Web/ ./Web/
COPY Domain/ ./Domain/
COPY SharedKernel/ ./SharedKernel/

# Publish .NET app
WORKDIR /src/Web
RUN dotnet publish "Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

# -----------------------------
# Stage 2: Runtime
# -----------------------------
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

# Copy published app from build stage
COPY --from=build /app/publish .

# Environment settings
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 80

# Start the app
ENTRYPOINT ["dotnet", "Web.dll"]