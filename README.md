Country Explorer is a fullstack web application for exploring countries and keep track of countries you have visited, plan to visit or even want to visit.
The application allow the user to either register an account or just log into a demo-account.

The goal of this project is to improve my fullstack development skills, write clean code, and exploring new technologies.

## Features
- Register an account 
- Login to your personal account
- Login to a demo account for exploring the application without registration
- JWT authentication with refresh tokens
- Explore countries
- Track visited countries (FRONTEND NOT IMPLEMENTED YET)
- Track countries you want to visit

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- React Router

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM

### Database
- PostgreSQL

### Authentication
- JWT
- Refresh tokens
- bcrypt
- HttpOnly cookies

## Status:
- Under deveopment

## Installation
### Prerequisites
Make sure you have installed:
- Node.js
- PostgreeSQL
- npm

### 1. Clone the repository
git clone https://github.com/markusol00/Country_Explorer.git
cd country-explorer

### 2. Install backend dependencies

cd backend 
npm install

### 3. Environment variables
Create a `.env` file in the backend directory and the required environment variables:

DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

### 4. Set up the database
Run the Prisma migrations:

npx prisma migrate dev

### 5. Start the backend

npm run dev

### 6. Install frontend dependencies

cd frontend
npm install

### 7. Start the frontend

npm run dev




