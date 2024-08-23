# PCG-SPA
## Overview

This project is a Land Management Application that allows users to sign up, manage owners and land holdings, and upload files related to owners and land holdings. The application is built using Vue.js for the frontend and Node.js with Express for the backend, and MongoDB for data storage. It uses JWT for authentication.

## Project Structure

- **backend**: Node.js application with Express
  - **API**: Provides endpoints for managing owners, land holdings, user authentication, and file uploads.
  - **Dockerfile**: Docker configuration for the backend service.
- **frontend**: Vue.js Single Page Application (SPA)
  - **Components**: Includes forms and lists for managing owners and land holdings, and file uploads.
  - **Dockerfile**: Docker configuration for the frontend service.
- **Docker Compose**: Configuration to run the entire application stack with Docker.

## Features

- User authentication with email and password.
- CRUD operations for Owners and Land Holdings.
- Deleting an Owner also deletes all related Land Holdings.
- Prevents users from creating Owners with the same Name and Address as an existing Owner.
- File upload support for Owners and Land Holdings.

## Prerequisites

- Docker and Docker Compose installed on your machine.

## Setup

1. **Clone the repository:**

`git clone <repository-url>`

`cd <repository-folder>`

2. **Build and start the services:**

Navigate to the root of the project and run:

`docker-compose up --build`

This command builds the Docker images for the backend and frontend and starts the containers.

## Configuration

**backend**

- **MongoDB URI**: Set in `backend/.env`:

`MONGO_URI=mongodb://mongo:27017/landmanagement`

`JWT_SECRET=your_jwt_secret`

Ensure that the JWT\_SECRET is a secure, random string used for signing JWT tokens.

**frontend**

- **API URL**: Set in `frontend/src/config.js`:

const config = {

`  `apiUrl: 'http://localhost:3000/api'

};

`export default config;`

## Usage

**Frontend**

- **Home Page**: http://localhost:8080
- **Endpoints**:
  - /owners: List all owners
  - /owners/new: Create a new owner
  - /owners/edit/:id: Edit an existing owner
  - /landholdings: List all land holdings
  - /landholdings/new: Create a new land holding
  - /landholdings/edit/:id: Edit an existing land holding
  - /upload: Upload files

**Backend API**

- **Authentication**:
  - **POST** /api/auth/signup: Sign up a new user
  - **POST** /api/auth/login: Log in and receive a JWT token
- **Owners**:
  - **GET** /api/owners: Retrieve all owners
  - **GET** /api/owners/:id: Get a single owner by ID
  - **POST** /api/owners: Create a new owner
  - **PUT** /api/owners/:id: Update an existing owner
  - **DELETE** /api/owners/:id: Delete an owner (and all related land holdings)
- **Land Holdings**:
  - **GET** /api/landholdings: Retrieve all land holdings
  - **GET** /api/landholdings/:id: Get a single land holding by ID.
  - **POST** /api/landholdings: Create a new land holding
  - **PUT** /api/landholdings/:id: Update an existing land holding
  - **DELETE** /api/landholdings/:id: Delete a land holding
- **Files**:
  - **POST** /api/files/upload: Upload a file
  - **GET** /api/files: List all uploaded files

