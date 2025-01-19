const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet'); 
const jwt = require('jsonwebtoken');  // For token-based authentication
const authRoutes = require('./routes/auth'); 
const File = require('./models/File'); 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://unicloudlib.vercel.app' })); 
app.use(helmet()); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); 
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
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF, JPEG, and PNG files are allowed'));
    }
    cb(null, true);
  },
});

// Token Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Routes
app.use('/auth', authRoutes); 

// Protected File Upload Route
app.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
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

// Protected File List Route
app.get('/files', verifyToken, async (req, res) => {
  try {
    const files = await File.find({});
    res.json(files);
  } catch (error) {
    console.error('Error retrieving files:', error.message);
    res.status(500).json({ message: 'Error retrieving files', error: error.message });
  }
});

// Protected File Retrieval Route
app.get('/files/:filename', verifyToken, (req, res) => {
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
