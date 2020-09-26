const Product = require("../Models/product");

exports.addProduct = async (req, res) => {
  const product = new Product(
    req.body.productName,
    req.body.productDescription,
    req.body.price
  );
  await product.save();
  res.status(301).redirect("/");
};

exports.getShopPageProducts = async (req, res) => {
  const products = await Product.getAllProducts();
  res.render("shop", { pageTitle: "Home", productList: products });
};
