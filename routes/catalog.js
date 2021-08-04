var express = require('express');
var router = express.Router();

const tagRouter = require("./tag");

router.use('/tag', tagRouter);

const tagController = require('../controllers/tagController');

router.get("/taglist", tagController.tagList);

const itemController = require('../controllers/itemController');

router.get("/itemlist", itemController.itemList);
router.get("/itemlist/filter", itemController.itemListFilterGet);
router.get("/itemlist/itemlist/filter", function(req, res) {
    res.redirect('../filter');
});
router.post("/itemlist/filter", itemController.itemListFilterPost);


const itemRouter = require("./item.js");
router.use('/item', itemRouter);

module.exports = router;