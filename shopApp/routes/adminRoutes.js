const path = require("path");
const fs = require("fs");

const express = require("express");

const Product = require("./../Models/product");

const router = express.Router();
const rootDirName = require("../utils/path");

router.post("/addProduct", async (req, res) => {
  const product = new Product(
    req.body.productName,
    req.body.productDescription,
    req.body.price
  );
  await addNewProduct(product);
  res.status(301).redirect("/");
});

function addNewProduct(Newproduct) {
  return new Promise(async (resolve, rejects) => {
    let existingProducts = [];
    existingProducts = await getAllProducts();
    existingProducts.push(Newproduct);
    resolve(existingProducts);
  }).then((existingProductList) => {
    return new Promise((resolve, rejects) => {
      fs.writeFile(
        path.join(rootDirName, "data", "products.txt"),
        JSON.stringify(existingProductList),
        (err) => {
          resolve();
        }
      );
    });
  });
}

function getAllProducts() {
  return new Promise((resolve, rejects) => {
    fs.readFile(path.join(rootDirName, "data", "products.txt"), (err, data) => {
      const products = JSON.parse(data);
      resolve(products);
    });
  });
}

module.exports = router;
