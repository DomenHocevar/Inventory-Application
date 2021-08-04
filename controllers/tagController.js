const Item = require('../models/Item.js');
const Tag = require('../models/Tag.js');
const async = require('async');

exports.tagList = function(req, res, next) {
    Tag.find()
    .sort({name: 1})
    .exec(function(err, tagList) {
        if (err) return next(err);
        res.render('tagList', {title: "Tag List", tagList: tagList});
    });
};

exports.tagDetail = function(req, res, next) {
    async.parallel({
        tag: function(callback) {
            Tag.findById(req.params.id, callback).orFail();
        },

        itemsWithTag: function(callback) {
            Item.find({tags: req.params.id}, callback)
        }
    }, function(err, results) {
        if (err) return next(err);
        console.log(results.tag.getColor);
        res.render("tagDetail", {title: "Tag Details: " + results.tag.name, tag: results.tag, itemsWithTag: results.itemsWithTag});
    });        
}

exports.tagAddGet = function(req, res) {
    res.render('tagForm', {title: "Add Genre"})
}

exports.tagAddPost = function(req, res, next) {
    const tag = new Tag({
       name: req.body.name,
       description: req.body.description 
    });

    tag.save(function(err) {
        if (err) {
            return next(err)
        }

        res.redirect(tag.url);
    });
}

exports.tagUpdateGet = function(req, res, next) {
    Tag.findById(req.params.id)
    .orFail()
    .exec(function(err, tag) {
        if (err) return next(err);
        if (!tag) {
            return next(new Error("No such Tag id"))
        }

        res.render('tagForm', {title: "Update Tag: " + tag.name, tag: tag})
    });
}

exports.tagUpdatePost = function(req, res, next) {
    const tag = new Tag({
        name: req.body.name,
        description: req.body.description,
        _id: req.params.id
    });
    Tag.findByIdAndUpdate(req.params.id, tag, function(err) {
        if (err) return next(err);
        res.redirect(tag.url);
    })
}