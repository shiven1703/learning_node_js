const Product = require("../Models/product");

exports.getShopHomePage = async (req, res) => {
  const products = await Product.getAllProducts();
  res.render("shop/index", { pageTitle: "Home", productList: products });
};

exports.getProductsPage = async (req, res) => {
  const products = await Product.getAllProducts();
  res.render("shop/productList", {
    pageTitle: "Products",
    productList: products,
  });
};

exports.getOrdersPage = (req, res) => {
  res.render("shop/orders", { pageTitle: "Orders" });
};

exports.getCheckoutPage = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};
