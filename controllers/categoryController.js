var Category = require('../models/category');
var Game = require('../models/game');

var async = require('async');

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

exports.category_detail = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_games: function (callback) {
        Game.find({ category: req.params.id })
          .populate('designer')

          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render('category_detail', {
        title: results.category.name,
        summary: results.category.summary,
        game_list: results.category_games,
      });
    }
  );
};
