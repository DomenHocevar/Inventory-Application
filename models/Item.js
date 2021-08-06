var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let ItemSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String},
        tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
        price: {type: Number, required: true},
        numberInStock: {type: Number, required: true},
        imagePath: {type: String, default: "/images/noImageAvailable.png"}
    }
);

ItemSchema
.virtual('url')
.get(function () {
  return '/catalog/item/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);