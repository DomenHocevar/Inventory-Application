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

TagSchema
.virtual('getColor')
.get(function() {
  const mod = 16581375;
  const p = 997;
  let fac = 1;
  const id = this._id.toString();
  let res = 0;
  for (let i = 0; i < id.length; i++) {
    res += id.charCodeAt(i) * fac;
    res %= mod;
    fac *= p;
    fac %= mod;
  }

  const resArray = new Array(3);
  for (let i = 0; i < 3; i++) {
    resArray[i] = res % 255;
    res /= 255;
    res = Math.floor(res);
  }

  return resArray;
});


module.exports = mongoose.model('Tag', TagSchema);