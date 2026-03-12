FROM mcr.microsoft.com/dotnet/aspnet:6.0

WORKDIR /app

COPY publish/ .

ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 80

ENTRYPOINT ["dotnet", "Web.dll"] 