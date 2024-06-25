# LETSDO

LETSDO is a task management application designed to help users efficiently manage and track their tasks. This application allows users to register, log in, create tasks, set reminders, and manage task statuses.

## Table of Contents

- [LETSDO](#letsdo)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup Instructions](#setup-instructions)
    - [API Documentation](#api-documentation)
    - [License](#license)

## Features

- User Authentication (Register, Login, Logout)
- Create, Update, Delete, and View Tasks
- Set Task Reminders
- Filter Tasks by Status
- API Documentation with Swagger

## Technologies

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- Joi (Input Validation)
- Swagger (API Documentation)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/ockx/letsdo.git
   cd letsdo

2. **Install dependencies**

   ```bash
   npm install

3. **Configure environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   DATABASE_URL=mysql://username:password@localhost:port/letsdo
   PORT=3000
   JWT_SECRET=your_jwt_secret

4. **Setup Instructions**

    Run Prisma migrations to set up the database schema:

    ```bash
    npx prisma migrate dev --name init

5. **Start the application**

    ```bash
    Copy code
    npm run dev

    The application will be running at http://localhost:3000.

### API Documentation

The API documentation is available at http://localhost:3000/api-docs once the application is running. This documentation is generated using Swagger and provides detailed information about the available endpoints and their usage.

### License
This project is licensed under the MIT License. See the LICENSE file for details.