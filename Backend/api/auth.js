const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model

const router = express.Router();

// Ensure JWT_SECRET is configured
if (!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable. Please set it in your .env file.');
}

// Helper function for error responses
const errorResponse = (res, message, code = 400) => res.status(code).json({ message });

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password, position } = req.body;

  // Basic validation
  if (!name || !email || !password || !position) {
    return errorResponse(res, 'All fields are required');
  }
  if (password.length < 6) {
    return errorResponse(res, 'Password must be at least 6 characters long');
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword, position });
    await newUser.save();

    return res.status(201).json({ 
      message: 'User created successfully', 
      user: { name: newUser.name, email: newUser.email, position: newUser.position }
    });
  } catch (err) {
    console.error('Signup Error:', err.message);
    return res.status(500).json({ 
      message: 'Something went wrong during signup', 
      error: err.message 
    });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user exists and explicitly select the password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password using the comparePassword method
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email, position: user.position },
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    return res.status(500).json({
      message: 'Something went wrong during login',
      error: err.message,
    });
  }
});

module.exports = router;
