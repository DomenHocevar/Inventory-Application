var express = require('express');
var router = express.Router();

const tagRouter = require("./tag");

router.use('/tag', tagRouter);

const tagController = require('../controllers/tagController');

router.get("/taglist", tagController.tagList);


const itemController = require('../controllers/itemController');

router.get("/itemlist", itemController.itemList);


const itemRouter = require("./item.js");
router.use('/item', itemRouter);

module.exports = router;