var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Do I need to add a games array?
var DatePublishedSchema = new Schema({
  year: { type: true, min: 0, max: 2021 },
});

GameSchema.virtual('url').get(function () {
  return '/catalog/DatePublished/' + this._id;
});

module.exports = mongoose.model('DatePublished', DatePublishedSchema);
