const mongodb = require("mongodb");
const Product = require("../Models/product");

const User = require("./../Models/user");

exports.getCartPage = async (req, res) => {
  const user = await User.getUserById(req.user._id)
  let total = 0;
  cartItems = [];

  if (user.cart !== undefined) {
    cartItems = user.cart.items;
    user.cart.items.forEach((item) => {
      let price = Number.parseFloat(item.price);
      let qty = Number.parseInt(item.qty);
      total = total + Number.parseFloat(price * qty);
    });
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
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productPrice = req.body.price;
    const img_url = req.body.img_url;
    const sellerId = mongodb.ObjectID(req.body.sellerId);
    const userId = req.user._id;

    const product = new Product(productName, productDescription, productPrice, img_url, sellerId);
    await User.addToCart(productId, product, userId);

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.removeFromCart = async (req, res) => {
  let productId = req.params.productId;
  await User.removeFromCart(productId, req.user._id);
  res.redirect("/cart");
};
