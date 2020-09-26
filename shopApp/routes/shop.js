const express = require("express");

const admin = require("./../routes/admin");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await admin.getAllProducts();
  res.render("shop", { pageTitle: "Home", productList: products });
});

exports.routes = router;
