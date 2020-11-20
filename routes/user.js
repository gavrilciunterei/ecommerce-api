const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.get('/user/:userId', requireSignin, isAuth, controller.read);
router.put('/user/:userId', requireSignin, isAuth, controller.update);

router.param('userId', controller.userById);

module.exports = router;
