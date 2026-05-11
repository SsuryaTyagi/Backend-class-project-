const express = require('express');
const router = express.Router();
const { registerValidator } = require('../validator/auth.validator');
const { RegisterController } = require('../controllers/auth.controller');

router.post('/register', registerValidator, RegisterController);

module.exports = router;