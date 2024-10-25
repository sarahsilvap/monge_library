const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for registering new users
router.post('/register', authController.register);

// Route for logging in users
router.post('/login', authController.login);

module.exports = router;