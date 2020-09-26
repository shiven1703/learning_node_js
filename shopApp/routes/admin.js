const express = require("express");

const adminController = require("./../controllers/admin");

const router = express.Router();

router.get("/addProduct", adminController.getAddProductPage);

router.get("/products", adminController.getAdminProductPage);

router.get("/editProducts", adminController.getEditProductPage);

router.post("/addProduct", adminController.addProduct);

module.exports = router;
