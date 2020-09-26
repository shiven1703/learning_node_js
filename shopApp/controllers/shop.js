const Product = require("../Models/product");

exports.getShopHomePage = async (req, res) => {
  const products = await Product.getAllProducts();
  res.render("shop/index", { pageTitle: "Home", productList: products });
};

exports.getProductsPage = (req, res) => {
  res.render("shop/productList", { pageTitle: "Products" });
};

exports.getCartPage = (req, res) => {
  res.render("shop/cart", { pageTitle: "Cart" });
};

exports.getCheckoutPage = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};
