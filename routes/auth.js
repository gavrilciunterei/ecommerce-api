const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const { userSignupValidator } = require('../validator/index');

router.post('/signup', userSignupValidator, controller.signup);
router.post('/signin', controller.signin);
router.get('/signout', controller.signout);

module.exports = router;
