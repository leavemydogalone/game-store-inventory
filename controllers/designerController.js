var Designer = require('../models/designer');

const { body, validationResult } = require('express-validator');

// Display list of all Designers.
exports.designer_list = function (req, res) {
  Designer.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_designers) {
      if (err) {
        return next(err);
      }
      res.render('designer_list', {
        title: 'List of Board Game Designers',
        designer_list: list_designers,
      });
    });
};

exports.designer_detail = function (req, res) {
  Designer.findById(req.params.id).exec(function (err, designer) {
    if (err) {
      return next(err);
    }
    res.render('designer_detail', {
      title: 'Designer Detail',
      designer: designer,
    });
  });
};

exports.designer_create_get = function (req, res) {
  res.render('designer_form', { title: 'Add new author' });
};

exports.designer_create_post = [
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric'),
  body('last_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Last name must be specified')
    .isAlphanumeric()
    .withMessage('Must be alphanumeric'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('designer_form', {
        title: 'Create Designer',
        designer: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid
      console.log('the error be here');
      var designer = new Designer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      });
      designer.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(designer.url);
      });
    }
  },
];
