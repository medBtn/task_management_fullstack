# Task Management Fullstack Application

This is a fullstack task management application built with Spring Boot for the backend and Angular for the frontend. It includes user authentication (admin and regular users), task management functionalities, and user management for administrators.

## Project Structure

-   **`task-management-backend`**: Spring Boot application providing RESTful APIs for authentication, user management, and task management.
-   **`task-management-frontend`**: Angular application providing the user interface for interacting with the backend APIs.
-   **`database`**: Contains SQL scripts for setting up the database schema and initial data.

## Features

### Authentication & Authorization
-   User registration and login (JWT-based authentication).
-   Role-based access control (Admin and User roles).

### Admin Features
-   Admin dashboard.
-   Create, edit, and delete tasks.
-   Assign tasks to users.
-   Create, edit, and delete users.

### User Features
-   User dashboard.
-   View assigned tasks.
-   Update task status.

## Technologies Used

### Backend (Spring Boot)
-   Java 21
-   Spring Boot 3.x
-   Spring Data JPA
-   Spring Security (JWT for authentication)
-   MySQL
-   Lombok

### Frontend (Angular)
-   Angular 17+
-   TypeScript
-   HTML/CSS (SCSS)
-   Angular Router
-   HttpClient

### Database
-   MySQL

## Setup Instructions

### 1. Database Setup

This project uses MySQL. Ensure you have a MySQL server running.

1.  **Create a Database**: Create a new database for the application (e.g., `task_management_db`).
    ```sql
    CREATE DATABASE task_management_db;
    ```
2.  **Run Schema Script**: Navigate to the `database` directory and execute the `schema.sql` file to create the necessary tables. You can use a MySQL client like MySQL Workbench or the command line:
    ```bash
    mysql -u your_username -p task_management_db < database/schema.sql
    ```
3.  **Run Data Script (Optional)**: Execute the `data.sql` file to populate the database with initial data (admin user, sample tasks, etc.):
    ```bash
    mysql -u your_username -p task_management_db < database/data.sql
    ```
    *Note:The `AuthServiceImpl.java` in the backend automatically inserts an initial admin account, along with several other users and sample tasks, into the database upon application startup using the `@PostConstruct` method. This provides a quick way to get started with pre-populated data.

    Additionally,this project uses MySQL as its database. The database schema and initial data are managed through SQL files located in the `database` folder. While `schema.sql` and `data.sql` are provided, please note that they contain PostgreSQL-specific syntax and may require adjustments for full compatibility with MySQL.*

### 2. Backend Setup

1.  **Navigate to Backend Directory**: Open your terminal or command prompt and go to the `task-management-backend` directory:
    ```bash
    cd task-management-backend
    ```
2.  **Configure Database Connection**: Open `src/main/resources/application.properties` (or `application.yml`) and configure your MySQL database connection details. If this file doesn't exist, you'll need to create it.
    Example `application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/task_management_db
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
    ```
3.  **Build the Project**: Build the Spring Boot application using Maven:
    ```bash
    ./mvnw clean install
    ```
4.  **Run the Application**: Start the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend server will typically run on `http://localhost:8080`.

    *Note: An initial admin account (`username: admin`, `password: admin`) is automatically created on application startup if it doesn't already exist. This is handled by the `@PostConstruct` method in `AuthServiceImpl`.*

### 3. Frontend Setup

1.  **Navigate to Frontend Directory**: Open a new terminal or command prompt and go to the `task-management-frontend` directory:
    ```bash
    cd task-management-frontend
    ```
2.  **Install Dependencies**: Install the Angular project dependencies:
    ```bash
    npm install
    ```
3.  **Configure Backend API URL**: Open `src/environments/environment.ts` and `src/environments/environment.prod.ts` and ensure `apiKey` points to your backend URL (default is `http://localhost:8080/api` or similar, depending on your backend configuration).
    Example `environment.ts`:
    ```typescript
    export const environment = {
      production: false,
      apiKey: 'http://localhost:8080/' // Adjust if your backend context path is different
    };
    ```
4.  **Run the Application**: Start the Angular development server:
    ```bash
    ng serve
    ```
    The frontend application will typically run on `http://localhost:4200`.

## Running the Application

1.  Ensure your MySQL database is running and configured.
2.  Start the Spring Boot backend application (see Backend Setup).
3.  Start the Angular frontend application (see Frontend Setup).
4.  Open your web browser and navigate to `http://localhost:4200`.

## API Endpoints (Backend)

Based on the current code, here are some expected endpoints:

### Authentication
-   `POST /authenticate`: User login.
-   `POST /sign-up`: User registration.

### User Management (Admin Only)
-   `GET /admin/users`: Get all users.
-   `GET /admin/user/{id}`: Get user by ID.
-   `POST /admin/user`: Create a new user.
-   `PUT /admin/user/{id}`: Update an existing user.
-   `DELETE /admin/user/{id}`: Delete a user.

### Task Management (Admin & User)
-   `GET /tasks`: Get all tasks (admin) or assigned tasks (user).
-   `GET /task/{id}`: Get task by ID.
-   `POST /task`: Create a new task (admin).
-   `PUT /task/{id}`: Update an existing task (admin).
-   `DELETE /task/{id}`: Delete a task (admin).
-   `PUT /task/{id}/status`: Update task status (user/admin).

*Note: The exact endpoint paths and request/response bodies might need to be confirmed by inspecting the backend code.* 

## Development

### Backend
-   Add new entities, repositories, services, and controllers as needed.
-   Implement business logic within services.
-   Ensure proper security configurations for new endpoints.

### Frontend
-   Create new components for additional features.
-   Develop services to interact with new backend APIs.
-   Update routing as necessary.
