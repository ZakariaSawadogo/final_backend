# 🏫 School Management System - Backend

This is the API (Backend) for the School Management System, developed as part of the **CENG 307** course. It is a robust server-side application built with **NestJS**, serving as the central hub for managing users, courses, grades, and authentication.

The backend communicates with a **MySQL** database via **TypeORM** and exposes a RESTful API secured by **JWT**.

## 🚀 Technologies Used

* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **Language:** TypeScript
* **Database:** MySQL
* **ORM:** TypeORM
* **Authentication:** Passport.js & JWT (JSON Web Tokens)
* **File Management:** Multer (Profile picture uploads)

## ✨ Key Features

### 🔐 Authentication & Security
* **Login:** Verifies credentials and generates JWT access tokens.
* **Hashing:** Passwords are encrypted using **bcrypt** before storage.
* **JWT Strategy:** Validates tokens to authorize incoming requests.

### 👤 User Management (CRUD)
* Complete management (Create, Read, Update, Delete) for:
    * **Administrators**
    * **Teachers**
    * **Students**
* Upload and storage of profile pictures.
* Security mechanism to prevent the deletion of Administrator accounts.

### 📚 School Management
* **Classes:** Creation and management of class levels (e.g., 6th Grade, 3th Grade).
* **Courses:** Assignment of subjects to classes and teachers (N:1 Relation).
* **Grades:**
    * Initialization of report cards.
    * Entry of grades (Homework, Exams).
    * **Auto-Calculation:** Subject averages and the student's General Average are automatically recalculated upon every update.
    * Validation: Ensures grades are between 0 and 20.

## 📂 Project Structure

```text
src/
├── auth/            # Authentication logic (Login, JWT)
├── users/           # User management and photo uploads
├── class-levels/    # Class level management
├── courses/         # Course management and assignments
├── grades/          # Grade entry and average calculations
├── profile-types/   # Role management (Admin, Prof, Student)
├── app.module.ts    # Root module and Database configuration
└── main.ts          # Application entry point
```
## 🔌 API Endpoints Documentation

### Authentication
* `POST /auth/login` : Authenticates a user and returns an `access_token`.

### Users (`/users`)
* `GET /users` : Retrieves a list of all users.
* `POST /users` : Creates a new user (optional photo upload).
* `PATCH /users/:id` : Updates a user (Name, Password, Photo...).
* `DELETE /users/:id` : Deletes a user.

### Classes (`/class-levels`)
* `GET /class-levels` : Lists all class levels.
* `POST /class-levels` : Creates a new class.
* `PATCH /class-levels/:id` : Updates a class.
* `DELETE /class-levels/:id` : Deletes a class.

### Courses (`/courses`)
* `GET /courses` : Lists all courses.
* `POST /courses` : Creates a course (Subject + Teacher + Class).
* `GET /courses/teacher/:id` : Gets courses assigned to a specific teacher.
* `GET /courses/class/:id` : Gets courses taught in a specific class.

### Grades (`/grades`)
* `POST /grades/initialize` : Creates an empty grade record for a student/course.
* `PATCH /grades/:id` : Updates grades and recalculates averages.
* `GET /grades/student/:id` : Retrieves all grades for a student.
* `GET /grades/result/:id` : Retrieves the student's general average.

## ⚙️ Installation and Configuration

### Prerequisites
* Node.js (v16+)
* MySQL Server

### 1. Install Dependencies
Open your terminal in the backend directory and run:

```bash
npm install
```
### 2. Database Configuration
1.  Ensure your MySQL server is running.
2.  Create an empty database named `dbo_school_management`.
3.  Open `src/app.module.ts` and verify your database credentials:

```typescript
// Inside src/app.module.ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',      // Check your username
  password: 'your_password', // Check your password
  database: 'dbo_school_management',
  entities: [User, ProfileType, ClassLevel, Course, Grade, StudentResult],
  synchronize: true,
}),
```
### 3. Running the Server
Start the application in development mode:

```bash
npm run start:dev