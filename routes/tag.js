var express = require('express');
var router = express.Router();

const tagController = require('../controllers/tagController');


router.get("/add", tagController.tagAddGet);
router.post("/add", tagController.tagAddPost);


router.get("/:id", tagController.tagDetail);

router.get("/:id/detail", function(res, req) {
    res.redirect('..')
});

router.get("/:id/update", tagController.tagUpdateGet); 
router.post("/:id/update", tagController.tagUpdatePost);

router.get("/:id/delete", tagController.tagDeleteGet);
router.post("/:id/delete", tagController.tagDeletePost);


module.exports = router;