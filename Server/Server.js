require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const connectToDB = require("./Config/connection.js");
const bookRoutes = require('./Routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS: allow all origins during development to make API testing (Postman/curl) simple.
const isProd = process.env.NODE_ENV === 'production';
const corsOptions = isProd
  ? {
      origin: [
        'https://libragraph-1.onrender.com',
        'https://libragraph.onrender.com',
        'https://libragraph-backend-7yjq.onrender.com',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }
  : {
      origin: '*', // allow all origins for easier API testing locally / with Postman
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: false,
    };

app.use(cors(corsOptions));
// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', bookRoutes);

// Health / status endpoint for quick API testing (Postman/curl)
app.get('/api/status', (req, res) => {
  const dbState = mongoose.connection && mongoose.connection.readyState;
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  res.json({ ok: true, port: PORT, dbState });
});

// Basic error handler for JSON responses
app.use((err, req, res, next) => {
  console.error('Internal error:', err && err.message ? err.message : err);
  res.status(500).json({ error: 'Internal server error', message: err?.message || '' });
});

// Connect to database and start server
connectToDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
});

module.exports = app;
