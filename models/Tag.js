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
.virtual('getColorArray')
.get(function() {
  const colorNumber = 150;                
  const mod = colorNumber * colorNumber * colorNumber;
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
    resArray[i] = res % colorNumber + 256 - colorNumber;
    res /= colorNumber;
    res = Math.floor(res);
  }


  return resArray;
});


//Set style= to this string
TagSchema
.virtual('getColorBackgroundStyleString')
.get(function() {
  const colorArray = this.getColorArray;
  return 'background-color: rgb(' + colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2] + ');'
})


module.exports = mongoose.model('Tag', TagSchema);