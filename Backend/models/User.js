const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
    trim: true, // Remove extra spaces
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (email) {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Exclude password from query results
  },
  position: {
    type: String,
    enum: {
      values: ['student', 'lecturer'],
      message: 'Position must be either "student" or "lecturer"',
    },
    required: [true, 'Position is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to hash password before saving (if needed in the future)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(12); // Use bcrypt to hash the password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Ensure unique email validation error is user-friendly
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Email already exists. Please use a different email.'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
