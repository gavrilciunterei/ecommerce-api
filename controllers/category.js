const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

var controller = {
  create: function (req, res) {
    const category = new Category(req.body);
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ data });
    });
  },
  categoryById: function (req, res, next, id) {
    Category.findById(id).exec((err, category) => {
      if (err || !category) {
        return res.status(400).json({
          error: 'Category does not exist',
        });
      }
      req.category = category;
      next();
    });
  },
  read: function (req, res) {
    return res.json(req.category);
  },
  update: function (req, res) {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
  },
  remove: function (req, res) {
    const category = req.category;
    category.remove((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({
        message: 'Category deleted',
      });
    });
  },
  list: function (req, res) {
    Category.find().exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(data);
    });
  },
};

module.exports = controller;
