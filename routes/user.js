const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const { userSignupValidator } = require('../validator/index');

router.post('/signup', userSignupValidator, controller.signup);

module.exports = router;
