# Car System Project

A full-stack application built with ASP.NET Core 6 and Angular 20.  
This project allows users to search for car makes and models using the NHTSA API, fully containerized using Docker.

GitHub Repository: [https://github.com/zienahmodeh/CarSystem](https://github.com/zienahmodeh/CarSystem)

---

## 🚀 Quick Start (Docker)

Run the entire system in seconds using Docker.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

### Build and Run
From the root directory (where the `Dockerfile` is located):

```bash
# Build the Docker image
docker build -t carsystem-image .

# Run the container
docker run -d -p 8080:80 --name car-system carsystem-image

Running Locally (Development)

1. Configure Environment

In Angular environment files (environment.ts & environment.prod.ts):

export const environment = {
  // ... other settings
  BOLink: 'http://localhost:61111',
  // or use relative path: BOLink: '../..'
};

2. Start Frontend
cd Web/Client
npm install
npm run start

Angular Dev Server: http://localhost:4200

3. Start Backend (Local)
Swagger API: http://localhost:61111/swagger/index.html

Project Structure

Domain/: Core business logic and interfaces.
SharedKernel/: Shared utilities and models.
Web/: ASP.NET Core API project.
Web/Controllers/: API Endpoints.
Web/wwwroot/: Production build of Angular.
Web/Client/: Angular 20 source code.
Dockerfile: Container configuration.