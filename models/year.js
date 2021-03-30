var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Do I need to add a games array?
var YearSchema = new Schema({
  name: { type: Number, min: 0, max: 2021, required: true },
});

YearSchema.virtual('url').get(function () {
  return '/catalog/year/' + this._id;
});

module.exports = mongoose.model('Year', YearSchema);
