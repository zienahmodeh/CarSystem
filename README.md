# Car System Project

A full-stack application built with ASP.NET Core 6 and Angular 20. This project allows users to search for car makes and models using  the NHTSA API, all containerized using Docker.


## Quick Start (Docker)

If you want to run the entire system in seconds using Docker:

### 1. Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

### 2. Build and Run
From the root directory where the `Dockerfile` is located, run:

# Build the image
docker build -t carsystem-image .

# Run the container
docker run -d -p 5000:80 --name car-system-container carsystem-image
Access the App at: http://localhost:5000

# Running Locally (Development)
If you want to run the project for development without Docker:

1. Environment Configuration
Make sure the BOLink is set correctly in your Angular environment files:

For Local Development (environment.ts && environment.prod.ts):

TypeScript
export const environment = {
  // ... other settings
  BOLink: 'http://localhost:61111', 
  // OR use: BOLink: '../..', 
};

2. Execution Steps
Run Angular: 
cd Web/Client
npm run start
http://localhost:4200/

Backend: Run Local
http://localhost:61111/swagger/index.html

## Project Structure (Solution)
Based on the project hierarchy:

Domain/: Core business logic and interfaces.

SharedKernel/: Shared utilities and models.

Web/: The main ASP.NET Core API.

Controllers/: API Endpoints (e.g., CarsController.cs).

wwwroot/: Hosted production build of Angular.

Client/: Angular 20 Source Code.

Dockerfile: Container configuration.

## Git Commands
project updated on GitHub:
 https://github.com/zienahmodeh/CarSystem
