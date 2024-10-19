const express = require('express');
const router = express.Router();
const { register, login } = require('../Controllers/authController'); // Adjust path as necessary

router.post('/register', register);
router.post('/login', login);

module.exports = router;


