const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  school: {
    type: String,
  },
  department: {
    type: String,
  },
  course: {
    type: String,
  },
  level: {
    type: String,
  },
  filename: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model('File', fileSchema);
module.exports = File;
