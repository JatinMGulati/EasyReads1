# EasyReads Backend API (Quick Postman/Curl guide)

This document shows the primary endpoints and example requests for testing the backend with Postman or curl.

Base URL (local): http://localhost:3000

## Health
- GET /api/status
  - Response: { ok: true, port: 3000, dbState }
  - Useful to check server + MongoDB connection state. dbState values: 0 disconnected, 1 connected.

## Books Endpoints
- GET /api/books
  - Returns: List of all books

- GET /api/fiction
  - Returns: List of fiction books

- GET /api/science
  - Returns: List of science books

- GET /api/biography
  - Returns: List of biography books

- GET /api/fantasy
  - Returns: List of fantasy books

- GET /api/history
  - Returns: List of history books

- GET /api/technology
  - Returns: List of technology books

- GET /api/romance
  - Returns: List of romance books

## Example curl requests

Get all books:
```bash
curl http://localhost:3000/api/books
```

Get fiction books:
```bash
curl http://localhost:3000/api/fiction
```

Check server status:
```bash
curl http://localhost:3000/api/status
```
