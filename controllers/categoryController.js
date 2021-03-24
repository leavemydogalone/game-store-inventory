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
