var Game = require('../models/game');
var Year = require('../models/year');
var Designer = require('../models/designer');
var Category = require('../models/category');

var async = require('async');

exports.index = function (req, res) {
  async.parallel(
    {
      game_count: function (callback) {
        Game.countDocuments({}, callback);
      },
      year_count: function (callback) {
        Year.countDocuments({}, callback);
      },
      category_count: function (callback) {
        Category.countDocuments({}, callback);
      },
      designer_count: function (callback) {
        Designer.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render('index', {
        title: 'Your lovely local game store',
        results: results,
      });
    }
  );
};

exports.game_list = function (req, res) {
  Game.find()
    .sort([['name', 'ascending']])
    .populate('designer')
    // .populate('year')
    .exec(function (err, list_games) {
      if (err) {
        return next(err);
      }

      res.render('game_list', {
        title:
          'List of alll of our games both in-stock and available for order',
        game_list: list_games,
      });
    });
};
