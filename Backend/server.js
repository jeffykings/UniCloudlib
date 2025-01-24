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
  // Check if the route is protected
  if (
    req.path === '/' || 
    req.path === '/api/auth/signup' || 
    req.path === '/api/auth/login'
  ) {
    return next(); // Skip authentication for public routes
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

// Public Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use(authenticate);

// Example Model for resources
const Resource = mongoose.model(
  'Resource',
  new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
  })
);

// Public route for fetching all resources
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ message: 'Error fetching resources', error: error.message });
  }
});

// Protected route for fetching resource by ID
app.get('/api/resources/:id', authenticate, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    res.status(500).json({ message: 'Error fetching resource', error: error.message });
  }
});

// Protected route for adding a new resource
app.post('/api/resources', authenticate, async (req, res) => {
  const { name, description, type } = req.body;
  if (!name || !description || !type) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newResource = new Resource({ name, description, type });
  try {
    await newResource.save();
    res.status(201).json({ message: 'Resource created successfully', resource: newResource });
  } catch (error) {
    console.error('Error saving resource:', error);
    res.status(500).json({ message: 'Error saving resource', error: error.message });
  }
});

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('UniCloudlib backend is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
