var express = require('express');
var router = express.Router();
const tagRouter = require("./tag");

router.use('tag', tagRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
