const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");
const cartController = require("../controllers/cart");
const errorController = require("./../controllers/error");

router.get("/", shopController.getShopHomePage);

router.get("/products", shopController.getProductsPage);

router.get("/cart", cartController.getCartPage);

router.post("/addToCart/:productId", cartController.addProductToCart);

router.post("/removeFromCart/:productId", cartController.removeFromCart);

router.get("/orders", shopController.getOrdersPage);

router.get("/checkout", shopController.getCheckoutPage);

// executes for 404 error
router.use(errorController.get404Page);

module.exports = router;
