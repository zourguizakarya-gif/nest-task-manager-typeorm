# NestJS Task Manager API (TypeORM)

A backend REST API built with NestJS and TypeORM for task management with authentication and role-based authorization.

---

## 🚀 Tech Stack
- NestJS
- TypeScript
- TypeORM
- PostgreSQL / MySQL
- JWT Authentication
- bcrypt
- class-validator
- class-transformer
- ConfigModule (.env support)

---

## 📁 Project Architecture

The project is built using a modular and scalable architecture:

- Auth Module (Authentication system)
- Tasks Module (CRUD system)
- Database Module (TypeORM connection)
- Middleware (Request processing)
- Guards (Authorization system)
- DTOs (Validation layer)
- Entities (Database models)

---

## 🔐 Authentication System

- User Registration
- User Login
- Password hashing using bcrypt
- JWT token generation
- Default role system (USER / ADMIN)

---

## 🛡️ Authorization System (RBAC)

This project implements Role-Based Access Control:

### Roles:
- USER → can manage only own tasks
- ADMIN → can manage all tasks

### Security Features:
- JWT Authentication Guard
- Role-based Guard
- Custom decorators for roles
- Middleware for request handling

---

## 📌 Features

### Auth Module
- Register new user
- Login user
- JWT token generation
- Assign default role (USER)

### Tasks Module
- Create task
- Update task
- Delete task (with role/owner check)
- Get all tasks
- Get task by ID

---

## 🧠 NestJS Concepts Used

- Modules
- Controllers
- Services
- Dependency Injection
- DTO (Data Transfer Objects)
- Entities (TypeORM)
- Middleware
- Guards
- Pipes (Validation)
- Custom Decorators
- Interfaces

---

## 🧱 Database (TypeORM)

This project uses TypeORM for database management:

- Entities define database tables
- Repository pattern for DB access
- Migrations support (optional)

---
## 📁 Project Structure
src/
 ├── app.module.ts
 ├── main.ts
 │
 ├── auth/
 │    ├── controller/
 │    ├── dto/
 │    ├── entities/
 │    └── service/
 │
 ├── tasks/
 │    ├── controller/
 │    ├── dto/
 │    ├── entities/
 │    ├── guard/
 │    ├── middleware/
 │    ├── service/
 │    └── validations/
 │
 └── database/
## 📦 Installation

```bash id="install_01"
npm install
