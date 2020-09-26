const express = require("express");

const router = express.Router();

const productController = require("./../controllers/product");
const errorController = require("./../controllers/error");

router.get("/", productController.getShopPageProducts);

// executes for 404 error
router.use(errorController.get404Page);

module.exports = router;
