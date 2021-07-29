var express = require('express');
var router = express.Router();

const tagController = require('../controllers/tagController');

router.get("/taglist", tagController.tagList);

module.exports = router;