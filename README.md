## Wizardry Wheels App
Wizardry Wheels is an App revolutionizing item transportation with virtual magic! Powered by advanced
technologies like Node.js, TypeScript, Docker, Docker Swarm, and MongoDB, it features swift, magical deliveries using
innovative tools, ensuring an efficient and unique delivery experience.


## 🚀 Features

- **Load Balancing**: Scalable and modular design for efficient service management using Docker-Swarm and NGINX server.
- **Multi-Environment Support**: Supports both **development** and **production** environments.
- **Docker & Docker Swarm**: Containerized deployment with rolling updates and scaling capabilities.
- **Docker HUB**: push and pull images from the remote repository.
- **Logging & Error Handling**: Comprehensive logging using **Winston** and robust error handling.
- **API Documentation**: Automatically generated API docs using **Swagger** and **JsDoc**.
- **Testing**: Unit tests for the repository layer and end-to-end (E2E) tests for API endpoints.
- **NGINX**: Used for URL redirection and load balancing.
- **TypeScript**: Strongly typed codebase for better maintainability and scalability.
- **Linting & Formatting**: Code quality enforced using **ESLint**.


## 🛠️ Technologies Used

| Technology       | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Node.js**      | Backend runtime environment for building scalable APIs.                     |
| **TypeScript**   | Strongly typed superset of JavaScript for better code quality.              |
| **Express.js**   | Web framework for building RESTful APIs.                                    |
| **MongoDB**      | NoSQL database for storing application data.                                |
| **Docker**       | Containerization for consistent deployment across environments.             |
| **Docker Swarm** | Orchestration tool for managing containers and rolling updates.             |
| **NGINX**        | Reverse proxy and load balancer for routing requests.                       |
| **Swagger**      | API documentation tool for interactive API exploration.                     |
| **JsDoc**        | Documentation generator for JavaScript/TypeScript code.                     |
| **Winston**      | Logging library for application logs.                                       |
| **Morgan**       | HTTP request logger middleware.                                             |
| **Jest**         | Testing framework for unit and E2E tests.                                   |
| **ESLint**       | Linting tool for maintaining code quality.                                  |



## 📂 Project Structure

```plaintext
/wizardry_wheels
|-- /src
|   |-- /config                # Configuration files (e.g., environment variables,DB, NGINX, Swagger)
|   |-- /controllers           # Route controllers
|   |-- /container             # Debedency Injection
|   |-- /middleware            # Custom middleware (e.g., validation, error handling)
|   |-- /models                # Database models (MongoDB schemas)
|   |-- /repositories          # Database interaction logic
|   |-- /routes                # API route definitions
|   |-- /services              # Business logic and service layer
|   |-- /utils                 # Utility functions and helpers
|   |-- index.ts               # Main application entry point
|-- /docs                      # Generated API documentation (JsDoc)
|-- /dist                      # combiled code
|-- /logging                   # log error and server info for debugging and profiling (winston, morgan, stream logger)
|-- /tests                     # Test files (unit and E2E tests)
|-- docker-compose.yml         # Base Docker Compose configuration
|-- docker-compose.dev.yml     # Development-specific Docker Compose configuration
|-- docker-compose.prod.yml    # Production-specific Docker Compose configuration
|-- Dockerfile                 # Multi-stage Docker build file
|-- .eslintrc.js               # ESLint configuration
|-- development.env            # environment variables for development
|-- production.env             # environment variables for production
|-- jest.setup.ts              # Jest configuration for unit tests
|-- jest.e2e.config.ts         # Jest configuration for E2E tests
|-- package.json               # Project dependencies and scripts
|-- tsconfig.json              # TypeScript configuration
```
## 🌍 Environments

The project supports two environments:

1. **Development Environment**:
   - Uses `docker-compose.dev.yml` for local development.
   - Includes hot-reloading for faster development cycles.
   - Debugging tools and logs are enabled.

2. **Production Environment**:
   - Uses `docker-compose.prod.yml` for deployment.
   - Optimized for performance and security.
   - NGINX is used as a reverse proxy and load balancer.

---


## 🏗️ How to Build and Run the Project

### Prerequisites
- Docker and Docker Compose installed on your machine.
- Node.js and npm/yarn for local development.


## development Environment

1. **Start the development environment:**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
   ```

   ## development Environment

2. **Docker Swarm Deployment:**
   ```bash
   docker stack deploy -c docker-compose.yml -c docker-compose.dev.yml wizardry-wheels
   ```
   ## development Environment

3. **View running services:**
   ```bash
   docker service ls
   ```


## Production Environment

1. **Start the production environment:**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
   ```

   ## Production Environment

2. **Docker Swarm Deployment:**
   ```bash
   docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml wizardry-wheels
   ```
   ## Production Environment

3. **View running services:**
   ```bash
   docker service ls
   ```

## Access the App

- **Node.js App**: Available at `http://localhost:8080`.
- **MongoDB**: Running on `http://localhost:27017`.
- **Swagger API Docs**: Available at `http://localhost:8080/api-docs/`.


## 📚 Documentation

### Swagger API Docs
Access the interactive API documentation at:
http://localhost:8080/api-docs/



## 🧪 Testing

### 1- Unit Tests
Run unit tests for the repository layer:
```bash
npm run test:unit
```


### 2- End-to-End (E2E) Tests
Run E2E tests for API endpoints::
```bash
npm run test:e2e
```



## 🛑 Error Handling & Logging

### Global Error Handling
- Centralized error handling middleware for consistent error responses across the application.

### 📜 Logging

- **Winston**: Logs are stored in both console and file for debugging and monitoring.
- **Morgan**: Logs HTTP requests for better visibility into API usage.

---

## 🔄 Docker Commands

### 🛠️ Build and Run

```bash
docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml build
docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml up -d --build

```
### 🛑 Stop and Remove Containers

```bash
docker-compose -f ./docker-compose.yml -f ./docker-compose.dev.yml down -v


```
### 🚢 Docker Swarm Deployment

```bash
docker stack deploy -c docker-compose.yml -c docker-compose.dev.yml wizardry-wheels


```


## 📜 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## ✍️ Author

**GHUSN_MHSEN**

Enjoy the magic of **Wizardry Wheels!** 🚀✨
