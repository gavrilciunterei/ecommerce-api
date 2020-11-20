const User = require('../models/user');
const { use } = require('../routes/user');

var controller = {
  userById: function (req, res, next, id) {
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found',
        });
      }
      req.profile = user;
      next();
    });
  },

  read: function (req, res) {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
  },

  update: function (req, res) {
    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: 'Your are not authorized to perform this action',
          });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
      }
    );
  },
};

module.exports = controller;
