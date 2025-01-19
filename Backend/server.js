// server.js

const express = require('express');
const multer = require('multer');
require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the auth routes
const jwtSecret = process.env.JWT_SECRET;
const path = require('path');
const fs = require('fs');
const fileMetadata = []; // Replace with database logic later
const File = require('./models/File');

const app = express();
// Use routes
app.use('/auth', authRoutes); // All authentication routes will start with '/auth'

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

    try {
    const fileData = new File({
      title: req.body.title,
      description: req.body.description,
      school: req.body.school,
      department: req.body.department,
      course: req.body.course,
      level: req.body.level,
      filename: req.file.filename,
    });
      await fileData.save();
  res.status(201).json({ message: 'File uploaded successfully', file: fileData });
    }
  catch (error) {
    res.status(500).json({ message: 'Error saving file metadata', error: error.message });
  }
});

// MongoDB connection
mongoose.connect('mongodb+srv://Alx:unicloudlib@cluster0.f3j4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route to serve uploaded files
app.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.sendFile(filePath);
     res.json(fileMetadata); // Replace this with MongoDB queries in the future
  });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



