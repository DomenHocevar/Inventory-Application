var express = require('express');
var router = express.Router();

const tagRouter = require("./tag");

router.use('/tag', tagRouter);

const tagController = require('../controllers/tagController');

router.get("/taglist", tagController.tagList);

router.get("/:id", tagController.tagDetail);

router.get("/:id/detail", function(res, req) {
    res.redirect('..')
});

module.exports = router;