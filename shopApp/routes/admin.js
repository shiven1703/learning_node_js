const express = require("express");

const productController = require("./../controllers/product");

const router = express.Router();

router.post("/addProduct", productController.addProduct);

module.exports = router;
