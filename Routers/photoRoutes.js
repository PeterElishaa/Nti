const express = require('express');
const { getPhotos, uploadPhoto, updatePhoto } = require('../controllers/photoController');
const multer = require('multer');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Route to get all photos
router.get('/', getPhotos);

// Route to add a new photo
router.post('/', upload.single('photo'), uploadPhoto);

// Route to update an existing photo
router.put('/:id', upload.single('photo'), updatePhoto);

module.exports = router;
