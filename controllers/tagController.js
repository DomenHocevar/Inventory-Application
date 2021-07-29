const Tag = require('../models/Tag.js');

exports.tagList = function(req, res, next) {
    Tag.find()
    .sort({name: 1})
    .exec(function(err, tagList) {
        if (err) return next(err);
        res.render('tagList', {title: "Tag List", tagList: tagList});
    });
};