const Product = require("../Models/product");

exports.getAddProductPage = (req, res) => {
  res.render("admin/addProduct", { pageTitle: "Add Products" });
};

exports.getAdminProductPage = (req, res) => {
  res.render("admin/products", { pageTitle: "Admin Products" });
};

exports.getEditProductPage = (req, res) => {
  res.render("admin/editProducts.ejs", { pageTitle: "Edit Products" });
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
