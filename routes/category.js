const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post(
  '/category/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  controller.create
);

router.param('userId', userById);

module.exports = router;
