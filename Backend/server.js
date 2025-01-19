// server.js

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the auth routes
const jwtSecret = process.env.JWT_SECRET;

const app = express();
// Use routes
app.use('/auth', authRoutes); // All authentication routes will start with '/auth'

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://Alx:unicloudlib@cluster0.f3j4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('UniCloudlib backend is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

