#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
var async = require('async');

var Category = require('./models/category');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = [];

function categoryCreate(name, summary, cb) {
  var category = new Category({ name: name, summary: summary });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate(
          'Worker Placement',
          'Games featuring an action selection system where you place your workers or other similar pieces onto spots on the board to choose your action',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Family',
          'Lighter and generally less serious games',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'War Game',
          'Tanks and planes and things of that nature',
          callback
        );
      },
      function (callback) {
        categoryCreate('Dice Rolling', 'Roll some dice', callback);
      },
      function (callback) {
        categoryCreate('Euro', 'From Europe?', callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createCategories],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Categories: ' + categories);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
