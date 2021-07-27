var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let TagSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String}
    }
);

TagSchema
.virtual('url')
.get(function () {
  return '/catalog/tag/' + this._id;
});

module.exports = mongoose.model('Tag', TagSchema);