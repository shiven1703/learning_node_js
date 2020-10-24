const Product = require("../Models/product");

exports.getAddProductPage = (req, res) => {
  res.render("admin/addProduct", { pageTitle: "Add Products" });
};

exports.getAdminProductPage = async (req, res) => {
  try {
    const products = await Product.findAll();
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
    let productId = Number.parseInt(req.params.productId);
    const p = await Product.findByPk(productId);
    res.render("admin/editProducts.ejs", {
      pageTitle: "Edit Products",
      product: p,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addProduct = async (req, res) => {
  const newProductName = req.body.productName;
  const newProductDescription = req.body.productDescription;
  const newProductPrice = req.body.price;
  try {
    await Product.create({
      productName: newProductName,
      productDescription: newProductDescription,
      price: newProductPrice,
    });
  } catch (error) {
    console.log(error);
  }
  res.status(301).redirect("/");
};

exports.updateProduct = async (req, res) => {
  try {
    let productId = Number.parseInt(req.params.productId);
    let updatedProductName = req.body.productName;
    let updatedProductDescription = req.body.productDescription;
    let updatedProductPrice = Number.parseFloat(req.body.price);
    await Product.update(
      {
        productName: updatedProductName,
        productDescription: updatedProductDescription,
        price: updatedProductPrice,
      },
      {
        where: {
          productId: productId,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};

exports.deleteProduct = async (req, res) => {
  try {
    let productId = Number.parseInt(req.params.productId);
    await Product.destroy({
      where: {
        productId: productId,
      },
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/admin/products");
};
