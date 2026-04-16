# Udaan: Classic Literature Library Management

## Introduction
Welcome to Udaan, a specialized library management web application designed entirely around classic literature. Unlike generic library systems, Udaan focuses uniquely on preserving, tracking, and curating timeless literary masterpieces. Our platform provides readers, librarians, and antique book enthusiasts with an elegant interface to manage timeless collections seamlessly.

## Key Features
- **Classic Literature Focus**: Categorizations and tracking designed specifically for classic, historical, and antique book collections rather than modern commercial releases.
- **Secure Custom Authentication**: Manual user registration and login system powered by JSON Web Tokens (JWT) and `bcryptjs`.
- **Modern Full-Stack Architecture**: Built with a React (Vite, TailwindCSS) frontend and a robust Node.js/Express backend.
- **Reliable Database Engine**: Fully integrated with PostgreSQL via Drizzle ORM for lightning-fast queries and data integrity.

## Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** database (currently hosted on Supabase/Render)

---

## How to Start the Project

To run this project locally, you will need to start both the backend server and the frontend development environment.

### 1. Environment Variables
Make sure you have a `.env` file in your `server` directory containing your database credentials:
```env
PORT=4000
DATABASE_URL=postgresql://<user>:<password>@<host>/<db_name>
JWT_SECRET=your_super_secret_jwt_key
```

### 2. Backend Setup
Open a terminal, navigate into the backend folder, and start the server:
```bash
cd server
npm install
npm start
```
*The server will run on `http://localhost:4000` and automatically connect to PostgreSQL.*

### 3. Frontend Setup
Open a second terminal, navigate into the frontend folder, and launch the Vite dev server:
```bash
cd Frontend
npm install
npm run dev
```
*The frontend will start on `http://localhost:4500`.*

### 4. Experience It
Once both servers are running, open your web browser and go to `http://localhost:4500/login`. Create your account via our secure Drizzle + JWT flow, and begin managing your classic literature library!
