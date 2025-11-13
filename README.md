# Anyware Dashboard Monorepo

A full-stack dashboard application built with NestJS (Backend), React + Vite (Frontend), and MongoDB. This project is managed as a monorepo using TurboRepo and pnpm.

## 📂 Project Structure

- apps/api: NestJS Backend API

- apps/web: React + Vite Frontend


## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20+ recommended)

- pnpm (Package Manager) - npm install -g pnpm

- Docker & Docker Compose (For containerized execution)

- MongoDB (If running locally without Docker)

## 🛠 Option 1: Running Locally

Follow these steps to run the frontend and backend on your local machine.

1. Install Dependencies

Run this command from the root of the project to install dependencies for all workspaces:

```
pnpm install
```


2. Environment Setup

You need to configure environment variables for both the API and Web apps.

`Backend` (apps/api/.env)
Copy the example file and update the database URL if necessary.

```
cp apps/api/.env.example apps/api/.env
```

Ensure your local MongoDB is running or update DATABASE_URL to point to a valid instance.

`Frontend` (apps/web/.env)
Copy the example file.
```
cp apps/web/.env.example apps/web/.env
```

By default, VITE_BACKEND_URL should be http://localhost:3000.

3. Start the Application

You can start both the frontend and backend simultaneously using TurboRepo:
```
pnpm dev
```

- Frontend: http://localhost:5173

- Backend API: http://localhost:3000

- Swagger Docs: http://localhost:3000/api-docs

## 🐳 Option 2: Running with Docker

You can containerize the entire application (Database + API + Frontend) using Docker Compose.

1. Configure Environment

Ensure your `docker-compose.yml` is set up correctly. The frontend requires the VITE_BACKEND_URL to point to your host machine (`localhost`), not the internal docker network, because the React code runs in your browser.

2. Build and Run

Run the following command in the root directory:
```
docker-compose up --build
```

This will start:

- MongoDB (Port 27017)

- NestJS API (Port 3000)

- React Web App (Port 5173)

3. Access the App

- Web App: http://localhost:5173

- API Health Check: http://localhost:3000/health

- Swagger Docs: http://localhost:3000/api-docs

1. Stopping Containers

To stop the services, press Ctrl + C or run:
```
docker-compose down
```
