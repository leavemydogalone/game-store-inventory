var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: { type: String, required: true },
  designer: { type: Schema.Types.ObjectId, ref: 'Designer', required: true },
  summary: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
  year: {
    type: Schema.Types.ObjectId,
    ref: 'Year',
    required: true,
  },
  stock: { type: Number, required: true },
});

GameSchema.virtual('url').get(function () {
  return '/catalog/game/' + this._id;
});

module.exports = mongoose.model('Game', GameSchema);
