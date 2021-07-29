var express = require('express');
var router = express.Router();

const tagController = require('../controllers/tagController');

router.get("/:id", tagController.tagDetail);

router.get("/:id/detail", function(res, req) {
    res.redirect('..')
});

module.exports = router;