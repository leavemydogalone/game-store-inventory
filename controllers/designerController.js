var Designer = require('../models/designer');

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
