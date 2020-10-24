const db = require("./../utils/database");
const Cart = require("./../Models/cart");

exports.getCartPage = async (req, res) => {
  const [cart, metadata] = await db.query(
    "select cart.productId, products.productName, SUM(cart.qty) AS qty, (SUM(cart.qty) * products.price) AS price from cart left join products on cart.productId = products.productId group by cart.productId;"
  );
  let total = 0;
  cart.forEach((product) => {
    total = total + product.price;
  });
  res.render("shop/cart", {
    pageTitle: "Cart",
    productList: cart,
    cartTotal: total,
  });
};

exports.addProductToCart = async (req, res) => {
  try {
    let productId = Number.parseInt(req.params.productId);
    await Cart.create({
      productId: productId,
      qty: 1,
    });
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.removeFromCart = async (req, res) => {
  let productId = Number.parseInt(req.params.productId);
  await Cart.destroy({
    where: {
      productId: productId,
    },
    limit: 1,
  });
  res.redirect("/cart");
};
