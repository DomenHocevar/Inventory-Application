var express = require('express');
var router = express.Router();

const itemController = require('../controllers/itemController');

router.get("/add", itemController.itemAddGet);
router.post("/add", itemController.itemAddPost);

router.get("/:id", itemController.itemDetail);

router.get("/:id/detail", function(res, req) {
    res.redirect('..')
});

module.exports = router;