const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', controller.read);
router.post(
  '/category/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  controller.create
);
router.put(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  controller.update
);
router.delete(
  '/category/:categoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  controller.remove
);
router.get('/categories', controller.list);

router.param('categoryId', controller.categoryById);
router.param('userId', userById);

module.exports = router;
