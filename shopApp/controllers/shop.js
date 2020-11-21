const Product = require("../Models/product");

exports.getShopHomePage = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.render("shop/index", { pageTitle: "Home", productList: products });
  } catch (error) {
    console.log(error);
  }
};

exports.getProductsPage = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.render("shop/productList", {
      pageTitle: "Products",
      productList: products,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrdersPage = (req, res) => {
  res.render("shop/orders", { pageTitle: "Orders" });
};

exports.getCheckoutPage = (req, res) => {
  res.render("shop/checkout", { pageTitle: "Checkout" });
};
