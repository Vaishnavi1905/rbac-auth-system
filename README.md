# Full-Stack Role-Based Access Control (RBAC) & Authentication System

A secure, premium-grade full-stack web application showcasing production-ready **JWT-based Authentication** and **Role-Based Access Control (RBAC)**. 

Built with a robust **Java Spring Boot** backend (leveraging Spring Security, JPA, MapStruct, and H2) and a fluid, dark-themed **React + TypeScript** frontend (using Vite, TailwindCSS v4, React Query, and React Router).

---

## 🏗️ Architecture & Security Highlights

### 🛡️ Backend Security Architecture
*   **Stateless JWT Authentication**: Implemented custom security filters to intercept HTTP requests, validate JWT signatures, and set user context in the `SecurityContextHolder`.
*   **Method & Endpoint Security**: Explicitly declared access permissions on REST endpoints:
    *   `/api/public/**` -> Permits all requests.
    *   `/api/user/**` -> Requires `ROLE_USER` or `ROLE_ADMIN`.
    *   `/api/admin/**` -> Strictly requires `ROLE_ADMIN`.
*   **Password Hashing**: BCrypt encryption for password storage.
*   **Database Seeding**: Automatically seeds standard role-based accounts on startup for immediate local evaluation.

### 🎨 Frontend Design & UX Decisions
*   **Role-Based UI Restructuring**: Interactive dashboard panels adapt to the authenticated user's credentials. Restricted components display a locked overlay with visual indicators.
*   **Persistent Sessions**: Secure token storage in `localStorage` with interceptors to automatically attach JWTs to outgoing requests.
*   **React Router Guards**: Client-side route blocking to prevent standard users from accessing admin routes.
*   **Asynchronous State**: Managed via TanStack React Query for cached, auto-refreshed queries, preventing unnecessary network traffic.

---

## 🛠️ Technology Stack

### Backend
*   **Framework**: Java 17, Spring Boot 3.2.5
*   **Security**: Spring Security 6, JJWT (Java JWT)
*   **Persistence**: Spring Data JPA, Hibernate, H2 In-Memory Database
*   **Mappers**: MapStruct 1.5.5 (clean DTO-Entity translations)
*   **Utilities**: Lombok
*   **Documentation**: Springdoc OpenAPI v2 (Swagger UI)

### Frontend
*   **Build Tool & Language**: Vite, React 19, TypeScript
*   **Styling**: TailwindCSS v4 (using the official `@tailwindcss/vite` plugin)
*   **Routing**: React Router DOM v7
*   **State Management**: TanStack React Query v5
*   **HTTP Client**: Axios (configured with interceptors)
*   **Icons**: Lucide React

---

## 🔌 API Reference & Endpoints

| Endpoint | Method | Required Role | Description |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | *Public* | Creates a new user with `USER` or `ADMIN` role |
| `/api/auth/login` | `POST` | *Public* | Authenticates user and returns signed JWT token |
| `/api/public` | `GET` | *Public* | Public content panel payload |
| `/api/user` | `GET` | `USER` or `ADMIN` | User protected dashboard content |
| `/api/admin` | `GET` | `ADMIN` | Admin protected management content |

---

## 🔑 Demo Seed Accounts

Upon project initialization, the backend automatically seeds the H2 database with the following demo accounts:

### 👤 Administrator Account
*   **Email**: `admin@example.com`
*   **Password**: `admin123`
*   **Assigned Role**: `ADMIN`

### 👥 Standard User Account
*   **Email**: `user@example.com`
*   **Password**: `user123`
*   **Assigned Role**: `USER`

---

## 🚀 Getting Started

### Prerequisites
*   **Java**: JDK 17 or higher
*   **Node.js**: Node 18 or higher (Node 22 recommended)
*   **Maven**: Embedded wrapper `mvnw` is included in the project

---

### 🟢 Running the Backend (Spring Boot)

1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2. Start the application:
    *   **Windows (PowerShell/CMD)**:
        ```cmd
        $env:JAVA_HOME="C:\Program Files\Java\jdk-21"  # Adjust if JDK is installed elsewhere
        .\mvnw.cmd spring-boot:run
        ```
    *   **Linux / macOS**:
        ```bash
        chmod +x mvnw
        ./mvnw spring-boot:run
        ```
3. The server starts on port **`8080`**.
4. **Swagger API Docs**: Open [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html) to interact with raw endpoints.
5. **H2 Console**: Open [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
    *   **JDBC URL**: `jdbc:h2:mem:rbacdb`
    *   **Username**: `sa`
    *   **Password**: *(leave blank)*

---

### 🔵 Running the Frontend (React)

1. Open a new terminal and navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2. Install npm packages:
    ```bash
    npm install
    ```
3. Start the Vite development server:
    ```bash
    npm run dev
    ```
4. Access the web app at: **[http://localhost:5173/](http://localhost:5173/)**
