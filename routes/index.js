var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inventory Application'});
});

router.get('/home', function(req, res) {
  res.redirect('./');
})

module.exports = router;
