const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");
const errorController = require("./../controllers/error");

router.get("/", shopController.getShopHomePage);

router.get("/products", shopController.getProductsPage);

router.get("/cart", shopController.getCartPage);

router.get("/checkout", shopController.getCheckoutPage);

// executes for 404 error
router.use(errorController.get404Page);

module.exports = router;
