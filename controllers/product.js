const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

var controller = {
  create: function (req, res) {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not be uploaded',
        });
      }

      // check for all fields
      const { name, description, price, category, quantity, shipping } = fields;

      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          error: 'All fields are required',
        });
      }

      let product = new Product(fields);
      if (files.photo) {
        // Restrict file size
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: 'Image should be less than 1mb in size',
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      product.save((err, result) => {
        if (err) {
          return res.status(400).json({
            err: errorHandler(err),
          });
        }
        res.json(result);
      });
    });
  },

  productById: function (req, res, next, id) {
    Product.findById(id).exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: 'Product not found',
        });
      }
      req.product = product;
      next();
    });
  },

  read: function (req, res) {
    req.product.photo = undefined;
    return res.json(req.product);
  },

  remove: function (req, res) {
    let product = req.product;
    product.remove((err, deleteProduct) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      res.json({
        message: 'Product deleted successfully',
      });
    });
  },

  update: function (req, res) {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not be uploaded',
        });
      }

      // check for all fields
      const { name, description, price, category, quantity, shipping } = fields;

      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          error: 'All fields are required',
        });
      }

      let product = req.product;
      product = _.extend(product, fields);

      if (files.photo) {
        // Restrict file size
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: 'Image should be less than 1mb in size',
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      product.save((err, result) => {
        if (err) {
          return res.status(400).json({
            err: errorHandler(err),
          });
        }
        res.json(result);
      });
    });
  },

  list: function (req, res) {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
      .select('-photo')
      .populate('category')
      .sort([[sortBy, order]])
      .limit(limit)
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            err: 'Products not found',
          });
        }
        res.json(products);
      });
  },

  listRelated: function (req, res) {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    // find by category not including the product that arrive with req
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
      .limit(limit)
      .populate('category', '_id name')
      .exec((err, products) => {
        if (err) {
          return res.status(400).json({
            err: 'Products not found',
          });
        }
        res.json(products);
      });
  },

  listCategories: function (req, res) {
    Product.distinct('category', {}, (err, categories) => {
      if (err) {
        return res.status(400).json({
          err: 'Products not found',
        });
      }
      res.json(categories);
    });
  },
};

module.exports = controller;
