const user = require('../models/user');
const User = require('../models/user');

var controller = {
  signup: function (req, res) {
    //console.log(req.body);
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      }
      res.json({
        user,
      });
    });
  },
};

module.exports = controller;
