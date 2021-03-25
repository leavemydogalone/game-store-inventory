var Category = require('../models/category');

// Display list of all Designers.
exports.category_list = function (req, res) {
  Category.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_categories) {
      if (err) {
        return next(err);
      }
      res.render('category_list', {
        title: 'Category List',
        category_list: list_categories,
      });
    });
};

exports.category_detail = function (req, res) {
  Category.findById(req.params.id).exec(function (err, category) {
    if (err) {
      return next(err);
    }
    res.render('category_detail', {
      title: category.name,
      summary: category.summary,
    });
  });
};
