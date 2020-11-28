const express = require("express");

const adminController = require("./../controllers/admin");

const router = express.Router();

router.get("/addProduct", adminController.getAddProductPage);

router.get("/products", adminController.getAdminProductPage);

router.get("/editProduct/:productId", adminController.getEditProductPage);

router.post("/updateProduct/:productId", adminController.updateProduct);

router.post("/deleteProduct/:productId", adminController.deleteProduct);

router.post("/addProduct", adminController.addProduct);

module.exports = router;
