const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title must be less than 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description must be less than 500 characters'],
  },
  school: {
    type: String,
    required: [true, 'School is required'],
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  course: {
    type: String,
    required: [true, 'Course is required'],
    trim: true,
  },
  level: {
    type: String,
    required: [true, 'Level is required'],
    enum: ['100', '200', '300', '400', '500', '600'],
  },
  filename: {
    type: String,
    required: [true, 'Filename is required'],
    unique: true, // Ensures no duplicate filenames
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the `updatedAt` field before saving
fileSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

// Add indexes for faster querying
fileSchema.index({ title: 1 });
fileSchema.index({ school: 1, department: 1, course: 1 });

const File = mongoose.model('File', fileSchema);

module.exports = File;
