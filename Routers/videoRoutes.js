const express = require('express');
const { getVideos, uploadVideo, updateVideo } = require('../Controllers/videoController');
const multer = require('multer');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),  // Change this path if needed
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Routes
router.get('/', getVideos);                  // Get all videos
router.post('/upload', upload.single('video'), uploadVideo); // Upload a new video
router.put('/:id', updateVideo);              // Update an existing video by ID

module.exports = router;
