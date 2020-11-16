const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

var controller = {
  create: function (req, res) {
    const category = new Category(req.body);
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json({ data });
    });
  },
};

module.exports = controller;
