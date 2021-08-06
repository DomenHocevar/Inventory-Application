
const Item = require('../models/Item.js');
const Tag = require('../models/Tag.js');
const async = require('async');
const fs = require('fs');

exports.itemList = function(req, res, next) {
    Item.find()
    .sort({name: 1})
    .populate('tags')
    .exec(function(err, itemList) {
        if (err) return next(err);
        if (req.query.requiredTagId) {
            if (!Array.isArray(req.query.requiredTagId)) req.query.requiredTagId = new Array(req.query.requiredTagId); 
            itemList = itemList.filter(item => {
                let ok = true;
                req.query.requiredTagId.forEach(function(requiredTag) {
                    let found = false;
                    item.tags.forEach(tag => {
                        if (tag._id.toString() === requiredTag) found = true;
                    })
                    if (!found) ok = false;
                });

                return ok;
            })
        }
        res.render('itemList', {title: "Item List", itemList: itemList})
    })
}

exports.itemListFilterGet = function(req, res, next) {
    Tag.find()
    .sort({name: 1})
    .exec(function(err, tags) {
       if (err) return next(err);
       res.render('itemListFilter', {title: "Filter Item List", tags: tags}); 
    });
}

exports.itemListFilterPost = function(req, res, next) {
    if (!req.body.tag) {
        res.redirect("./");
    } else {
        let urlString = "";
        if (!Array.isArray(req.body.tag)) {
            req.body.tag = new Array(req.body.tag);
        }
        for (let i = 0; i < req.body.tag.length; i++) {
            if (i != 0) urlString += '&';
            urlString += 'requiredTagId=' + req.body.tag[i];
        }
        res.redirect(".?" + urlString);
    }
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
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tag,
        price: req.body.price,
        imagePath: (req.file ? req.file.path.substring(6) : undefined),
        numberInStock: req.body.numberInStock
    })

    item.save(function(err) {
        if (err) return next(err);
        res.redirect("../item/" + item._id);
    })
}

exports.itemUpdateGet = function(req, res, next) {
    async.parallel({
        item: function(callback) {
            Item.findById(req.params.id)
            .orFail()
            .exec(callback);
        },
        tags: function(callback) {
            Tag.find(callback);
        }

    }, function(err, results) {
        res.render('itemForm', {title: "Update Item: " + results.item.name, item: results.item, tags: results.tags});
    });
    
}

exports.itemUpdatePost = function(req, res, next) {
    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tag,
        price: req.body.price,
        numberInStock: req.body.numberInStock,
        imagePath: (req.file ? req.file.path.substring(6) : undefined),
        _id: req.params.id
    });

    Item.findByIdAndUpdate(req.params.id, item, function(err, item) {
        if (err) return next(err);
        if (item.imagePath != "/images/noImageAvailable.png") {
            fs.unlinkSync("public" + item.imagePath);
        }
        res.redirect(item.url);
    })
}

exports.itemDeleteGet = function(req, res, next) {
    Item.findById(req.params.id)
    .orFail()
    .exec( function(err, item) {
        if (err) return next(err);
        res.render('itemDelete', {title: "Delete Item: " + item.name, item: item});
    });
}

exports.itemDeletePost = function(req, res, next) {
    Item.findByIdAndDelete(req.params.id)
    .orFail()
    .exec(function(err, item) {
        if (err) return next(err);
        if (item.imagePath != "/images/noImageAvailable.png") {
            fs.unlinkSync("public" + item.imagePath);
        }
        res.redirect('../../itemlist');
    });
}