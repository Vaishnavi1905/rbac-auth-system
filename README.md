# Full-Stack Authentication & Role-Based Access Control (RBAC) System

A secure, premium-designed full-stack web application demonstrating JWT-based authentication and Role-Based Access Control (RBAC). 

Built using a **Java Spring Boot** backend (Spring Security, JPA, MapStruct, H2) and a **React + TypeScript** frontend (Vite, TailwindCSS, React Query, Axios).

---

## Features

1. **JWT Authentication & Registration**: Users can sign up, select their role (`USER` or `ADMIN`), and log in securely. Credentials are validated, and a signed JWT is returned upon successful authentication.
2. **Access Protection (RBAC)**: Enforces endpoints security on the backend and routes protection on the frontend:
   - `/api/public`: Publicly accessible to anyone.
   - `/api/user`: Accessible by logged-in users with `USER` or `ADMIN` roles.
   - `/api/admin`: Accessible strictly by users with the `ADMIN` role.
3. **Interactive Control Panel (Dashboard)**: A visually gorgeous dark-themed dashboard that reveals and unlocks API content panels dynamically based on the current user's role:
   - Admins see all panels unlocked and displaying data from backend API calls.
   - Standard users see the `ADMIN` panel locked with a lock overlay and status indicator.
4. **Auto-Persisted Sessions**: Login status is persisted securely in `localStorage` across page refreshes.
5. **Interactive Swagger/OpenAPI Docs**: Backend routes are fully documented with Swagger UI.
6. **Seed Data**: System pre-seeds standard test accounts on startup.

---

## Tech Stack

### Backend
- **Core**: Java 17, Spring Boot 3.2.5
- **Security**: Spring Security + Java JWT (JJWT)
- **Data**: Spring Data JPA + H2 In-Memory Database + Hibernate
- **Utilities**: MapStruct (for DTO mappings) and Lombok
- **Documentation**: Springdoc OpenAPI v2 (Swagger UI)

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS v4 (integrated via `@tailwindcss/vite` plugin)
- **State Management**: TanStack React Query (v5)
- **Routing**: React Router DOM (v7)
- **HTTP Client**: Axios (configured with request interceptor for JWT injection)
- **Forms**: React Hook Form (with email & length validation)
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites
- **Java**: JDK 17 or higher (Java 19 verified)
- **Node.js**: Node 18+ (Node 22.14 verified)

---

### Backend Setup (Spring Boot)

1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Run the application using the included Maven Wrapper:
   - **Windows (Command Prompt / PowerShell)**:
     ```cmd
     mvnw.cmd spring-boot:run
     ```
   - **Linux / macOS**:
     ```bash
     chmod +x mvnw
     ./mvnw spring-boot:run
     ```
3. The server will start on port `8080`.
4. Access the Swagger UI API documentation at:
   [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
5. Access the H2 Database console at:
   [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:rbacdb`, User: `sa`, Password: empty)

#### Seed Accounts (Created automatically on startup)
- **Admin Account**:
  - **Email**: `admin@example.com`
  - **Password**: `admin123`
  - **Role**: `ADMIN`
- **Standard User Account**:
  - **Email**: `user@example.com`
  - **Password**: `user123`
  - **Role**: `USER`

---

### Frontend Setup (React)

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   [http://localhost:5173](http://localhost:5173)

---

## IDE Compatibility (Eclipse & IntelliJ)

This project has been structured cleanly for easy importing:
- **IntelliJ IDEA**: 
  - Go to `File -> Open` and select the `rbac-auth-system` root folder or the `backend` directory. IntelliJ will automatically detect it as a Maven module and import dependencies.
- **Eclipse IDE**:
  - Go to `File -> Import... -> Maven -> Existing Maven Projects`.
  - Select the `backend` directory containing `pom.xml`. Eclipse will import and configure the Java build path automatically.
