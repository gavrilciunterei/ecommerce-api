const user = require('../models/user');
const User = require('../models/user');

var controller = {
  signup: function (req, res) {
    const use = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error,
        });
      }
      res.json({
        user,
      });
    });
  },
};

module.exports = controller;
