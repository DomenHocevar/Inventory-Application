
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

exports.itemDetail = function(req, res) {
    Item.findById(req.params.id)
    .orFail()
    .populate('tags')
    .exec(function(err, item) {
        if (err) return next(err);
        res.render('itemDetail', {title: "Item Details: " + item.name, item: item});
    })
}