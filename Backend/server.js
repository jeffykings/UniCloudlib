// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import JWT for authentication
const authRoutes = require('./routes/auth'); // Import the auth routes

const app = express();
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Alx:pxw9BC9rQ74JuDzM@cluster0.f3j4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(express.json());
app.use(cors());

// Authentication Middleware
const authenticate = (req, res, next) => {
  if (req.path === '/' || req.path.startsWith('/auth')) {
    // Allow unauthenticated access to public routes
    return next();
  }
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or invalid' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Apply authentication middleware
app.use(authenticate);

// Use routes
app.use('/auth', authRoutes); // All authentication routes will start with '/auth'

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('UniCloudlib backend is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
