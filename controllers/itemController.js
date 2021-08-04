
const Item = require('../models/Item.js');
const Tag = require('../models/Tag.js');

exports.itemList = function(req, res, next) {
    Item.find()
    .sort({name: 1})
    .populate('tags')
    .exec(function(err, itemList) {
        if (err) return next(err);
        res.render('itemList', {title: "Item List", itemList: itemList})
    })
}

exports.itemDetail = function(req, res, next) {
    Item.findById(req.params.id)
    .orFail()
    .populate('tags')
    .exec(function(err, item) {
        if (err) return next(err);
        res.render('itemDetail', {title: "Item Details: " + item.name, item: item});
    })
}

exports.itemAddGet = function(req, res, next) {
    Tag.find(function(err, tags) {
        if (err) return next(err);
        res.render("itemForm", {title: "Add Item", tags: tags});
    })
}

exports.itemAddPost = function(req, res, next) {
    console.log(req.body.tags);
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tag,
        price: req.body.price,
        numberInStock: req.body.numberInStock
    })

    item.save(function(err) {
        if (err) return next(err);
        res.redirect("../item/" + item._id);
    })
}