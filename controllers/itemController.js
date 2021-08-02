
const Item = require('../models/Item.js');

exports.itemList = function(req, res, next) {
    Item.find()
    .sort({name: 1})
    .populate('tags')
    .exec(function(err, itemList) {
        if (err) return next(err);
        res.render('itemList', {title: "Item List", itemList: itemList})
    })
}