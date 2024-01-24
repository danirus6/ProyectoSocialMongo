const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/me', userController.getUserInfo);

module.exports = router;
