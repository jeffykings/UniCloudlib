const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'fallback_secret';
const jwtExpiry = process.env.JWT_EXPIRY || '1h';
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 12;

// Signup Route
router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('position').isIn(['student', 'lecturer']).withMessage('Invalid position'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { name, email, password, position } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ name, email, password: hashedPassword, position });

      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error('Error during signup:', err.message);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }
);

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: jwtExpiry });
      res.status(200).json({ message: 'Login successful', token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (err) {
      console.error('Error during login:', err.message);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  }
);

module.exports = router;
