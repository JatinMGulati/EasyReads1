# EasyReads

EasyReads is a lightweight library management web application built with a React frontend and an Express + MongoDB backend. It provides a browsable catalog of books, category endpoints, and JWT-based authentication for users.

## Features

- Browse and filter books by category (Fiction, Science, Biography, Fantasy, History, Technology, Romance).
- JWT-based authentication: register and login endpoints returning JWT tokens for protected access.
- Simple, testable API with a /api/status health endpoint for quick checks.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, Mongoose
- Database: MongoDB

## Getting started

Prerequisites: Node.js (>=14), a MongoDB instance or Atlas connection string.

1. Install server dependencies and start the server

```bash
cd Server
npm install
cp .env.example .env
# edit .env and set MONGO_DB_URI and JWT_SECRET
npm run dev
```

2. Install client dependencies and start the frontend

```bash
cd ../Client
npm install
cp .env.example .env
# edit .env as needed (only public VITE_ keys)
npm run dev
```

3. Quick checks

- Health: GET http://localhost:3001/api/status
- Register: POST http://localhost:3001/api/auth/register
- Login: POST http://localhost:3001/api/auth/login
- Public catalog: GET http://localhost:3001/api/books

## API testing

The Server/README_API.md file includes curl examples for quick tests and can be imported into Postman manually. If you'd like, I can add a Postman collection JSON to the repo.

## Contributors

- Jatin M Gulati
- G Madhuri Varma
- 

---

## License

MITPlaceholder for Madhurivarma5
