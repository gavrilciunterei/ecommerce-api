const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/product/:productId', controller.read);
router.post(
  '/product/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  controller.create
);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  controller.remove
);
router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  controller.update
);
router.get('/products', controller.list);

router.param('userId', userById);
router.param('productId', controller.productById);

module.exports = router;
