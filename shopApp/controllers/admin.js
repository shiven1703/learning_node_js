const Product = require("../Models/product");

exports.getAddProductPage = (req, res) => {
  res.render("admin/addProduct", { pageTitle: "Add Products" });
};

exports.getAdminProductPage = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.render("admin/products", {
      pageTitle: "Admin Products",
      productList: products,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getEditProductPage = async (req, res) => {
  try {
    let productId = req.params.productId;
    const p = await Product.getProductById(productId);
    res.render("admin/editProducts.ejs", {
      pageTitle: "Edit Products",
      product: p,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addProduct = async (req, res) => {
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productPrice = req.body.price;
  const sellerId = req.user._id;

  try {
    const product = new Product(productName, productDescription, productPrice, null, sellerId);
    await product.save();

  } catch (error) {
    console.log(error);
  }
  res.status(301).redirect("/");
};

exports.updateProduct = async (req, res) => {
  try {
    let productId = req.params.productId;
    let updatedProductName = req.body.productName;
    let updatedProductDescription = req.body.productDescription;
    let updatedProductPrice = Number.parseFloat(req.body.price);
    await Product.updateProduct(productId, updatedProductName, updatedProductDescription, updatedProductPrice);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};

exports.deleteProduct = async (req, res) => {
  try {
    let productId = req.params.productId;
    await Product.deleteProduct(productId);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/admin/products");
};
