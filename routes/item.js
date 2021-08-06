var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'public/images/uploads/' })

const itemController = require('../controllers/itemController');

router.get("/add", itemController.itemAddGet);
router.post("/add", upload.single('itemImage'), itemController.itemAddPost);

router.get("/:id", itemController.itemDetail);

router.get("/:id/detail", function(res, req) {
    res.redirect('..')
});

router.get("/:id/update", itemController.itemUpdateGet);
router.post("/:id/update", upload.single('itemImage'), itemController.itemUpdatePost);

router.get("/:id/delete", itemController.itemDeleteGet);
router.post("/:id/delete", itemController.itemDeletePost);

module.exports = router;