var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DesignerSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});

DesignerSchema.virtual('name').get(function () {
  return this.last_name + ', ' + this.first_name;
});

DesignerSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Designer', DesignerSchema);
