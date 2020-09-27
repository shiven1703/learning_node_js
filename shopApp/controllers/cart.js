const Cart = require("./../Models/cart");

exports.getCartPage = async (req, res) => {
  const cart = await Cart.getAllProductsFromCart();
  const total = cart.total;
  res.render("shop/cart", {
    pageTitle: "Cart",
    productList: cart.products,
    cartTotal: total,
  });
};

exports.addProductToCart = async (req, res) => {
  let productId = Number.parseInt(req.params.productId);
  let productPrice = Number.parseFloat(req.body.productPrice);
  await Cart.addProduct(productId, productPrice);
  res.redirect("/cart");
};

exports.removeFromCart = async (req, res) => {
  let productId = Number.parseInt(req.params.productId);
  await Cart.removeProductFromCart(productId);
  res.redirect("/cart");
};
