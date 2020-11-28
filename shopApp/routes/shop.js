const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");
const cartController = require("../controllers/cart");

router.get("/", shopController.getShopHomePage);

router.get("/products", shopController.getProductsPage);

router.get("/cart", cartController.getCartPage);

router.get("/orders", shopController.getOrdersPage);

router.post("/addToCart/:productId", cartController.addProductToCart);

router.post("/removeFromCart/:productId", cartController.removeFromCart);

router.post("/checkout", cartController.checkout);






module.exports = router;
