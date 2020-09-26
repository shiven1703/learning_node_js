const path = require("path");
const fs = require("fs");

const rootDirName = require("../utils/path");

const getProductsFromFile = () => {
  return new Promise((resolve, rejects) => {
    fs.readFile(
      path.join(rootDirName, "data", "products.json"),
      (err, data) => {
        let products = [];
        if (!err) {
          products = JSON.parse(data);
        }
        resolve(products);
      }
    );
  });
};

const saveProductsToFile = (products) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(
      path.join(rootDirName, "data", "products.json"),
      JSON.stringify(products),
      (err) => {
        resolve();
      }
    );
  });
};

class Product {
  constructor(productName, productDescription, price) {
    this.productName = productName;
    this.productDescription = productDescription;
    this.price = price;
  }

  async save() {
    return new Promise(async (resolve, rejects) => {
      let existingProducts = await getProductsFromFile();
      existingProducts.push(this);
      resolve(existingProducts);
    }).then(async (existingProductList) => {
      await saveProductsToFile(existingProductList);
    });
  }

  static async getAllProducts() {
    return await getProductsFromFile();
  }
}

module.exports = Product;
