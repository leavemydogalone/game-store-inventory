var Year = require('../models/year');
var Game = require('../models/game');
var async = require('async');

// Display list of all Designers.
exports.year_list = function (req, res) {
  async.parallel(
    {
      year_list: function (callback) {
        Year.find().exec(callback);
      },
      // year_count: function (callback) {
      //   Year.count().exec(callback);
      // },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }

      res.render('year_list', {
        title: 'Search games by year published',
        year_list: results.year_list,
        year_count: results.year_count,
      });
    }
  );
};
