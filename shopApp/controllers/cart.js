const mongodb = require("mongodb");
const Product = require("../Models/product");
const { getDb } = require("../utils/database");

const User = require("./../Models/user");

exports.getCartPage = async (req, res) => {
  const user = req.user;
  let total = 0;
  cartItems = [];


  if (user.cart !== undefined) {
    cartItems = await User.getCartItems(user);
    cartItems.forEach((item) => {
      let price = Number.parseFloat(item.price);
      let qty = Number.parseInt(item.qty);
      total = total + Number.parseFloat(price * qty);
    });
    total = total.toFixed(2);
  }

  res.render("shop/cart", {
    pageTitle: "Cart",
    productList: cartItems,
    cartTotal: total,
  });
};

exports.addProductToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    await User.addToCart(productId, req.user);
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.removeFromCart = async (req, res) => {
  let productId = req.params.productId;
  await User.removeFromCart(productId, req.user);
  res.redirect("/cart");
};

exports.checkout = async (req, res) => {
  try {
    const user = req.user;
    await User.addOrder(user);
    await User.emptyCart(user);
    res.status(301).redirect("/orders");
  } catch (error) {
    console.log(error);
  }
};
