// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); // Security headers
const authRoutes = require('./routes/auth'); // Import auth routes
const File = require('./models/File'); // Import File model

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://your-frontend-domain.com' })); // Restrict CORS
app.use(helmet()); // Add security headers

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process on DB failure
  });

// Multer Configuration
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF, JPEG, and PNG files are allowed'));
    }
    cb(null, true);
  },
});

// Routes
app.use('/auth', authRoutes); // Auth routes

// File Upload Route
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
  } catch (error) {
    console.error('Error saving file metadata:', error.message);
    res.status(500).json({ message: 'Error saving file metadata', error: error.message });
  }
});

// File List Route
app.get('/files', async (req, res) => {
  try {
    const files = await File.find({});
    res.json(files);
  } catch (error) {
    console.error('Error retrieving files:', error.message);
    res.status(500).json({ message: 'Error retrieving files', error: error.message });
  }
});

// File Retrieval Route
app.get('/files/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.sendFile(filePath);
  });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
