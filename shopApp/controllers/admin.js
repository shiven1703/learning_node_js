const Product = require("../Models/product");

exports.getAddProductPage = (req, res) => {
  res.render("admin/addProduct", { pageTitle: "Add Products" });
};

exports.getAdminProductPage = async (req, res) => {
  const products = await Product.getAllProducts();
  res.render("admin/products", {
    pageTitle: "Admin Products",
    productList: products,
  });
};

exports.getEditProductPage = async (req, res) => {
  let productId = Number.parseInt(req.params.productId);
  const p = await Product.getProductById(productId);
  res.render("admin/editProducts.ejs", {
    pageTitle: "Edit Products",
    product: p,
  });
};

exports.addProduct = async (req, res) => {
  const product = new Product(
    req.body.productName,
    req.body.productDescription,
    req.body.price
  );
  await product.save();
  res.status(301).redirect("/");
};

exports.updateProduct = async (req, res) => {
  let productId = Number.parseInt(req.params.productId);
  let productName = req.body.productName;
  let productDescription = req.body.productDescription;
  let price = Number.parseFloat(req.body.price);
  await Product.update(productId, productName, productDescription, price);
  res.redirect("/");
};

exports.deleteProduct = async (req, res) => {
  let productId = Number.parseInt(req.params.productId);
  await Product.delete(productId);
  res.redirect("/admin/products");
};
