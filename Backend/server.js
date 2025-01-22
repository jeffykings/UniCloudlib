// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');

dotenv.config();

const authRoutes = require('./api/auth'); // Import the auth routes
const app = express();
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Authentication Middleware
const authenticate = (req, res, next) => {
  if (req.path === '/' || req.path.startsWith('/api/auth')) {
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

app.use(authenticate);
app.use('/api/auth', authRoutes);

// Example Model (adjust as needed)
const Resource = mongoose.model('Resource', new mongoose.Schema({
  name: String,
  description: String,
  type: String
}));

// Fetch resources endpoint
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching resources' });
  }
});

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('UniCloudlib backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
