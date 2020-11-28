const Product = require("../Models/product");
const User = require("../Models/user");

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

exports.getOrdersPage = async (req, res) => {
  const orders = await User.getOrders(req.user);
  res.render("shop/orders", {
    pageTitle: "Orders",
    orderList: orders,
  });
};


