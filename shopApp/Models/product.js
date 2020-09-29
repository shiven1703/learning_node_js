const path = require("path");
const fs = require("fs").promises;

const rootDirName = require("../utils/path");

class Product {
  constructor(productName, productDescription, price) {
    this.productId = getRandomNumber(0, 1000);
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

  static async update(pid, productName, productDescription, price) {
    const products = await getProductsFromFile();
    const updatedProducts = products.map((product) => {
      if (product.productId === pid) {
        product.productName = productName;
        product.productDescription = productDescription;
        product.price = price;
      }
      return product;
    });
    await saveProductsToFile(updatedProducts);
  }

  static async delete(pid) {
    const products = await getProductsFromFile();
    const updatedProducts = products.filter((product) => {
      if (product.productId !== pid) {
        return true;
      }
    });
    await saveProductsToFile(updatedProducts);
  }

  static async getProductById(pid) {
    let products = await getProductsFromFile();
    return products.find((product) => product.productId === pid);
  }

  static async getAllProducts() {
    return await getProductsFromFile();
  }
}

const getProductsFromFile = async () => {
  let products = [];
  let fileName = getFileName();
  try {
    let data = await fs.readFile(fileName);
    products = JSON.parse(data);
  } catch (error) {}

  return products;
};

const saveProductsToFile = async (products) => {
  let fileName = getFileName();
  try {
    await fs.writeFile(fileName, JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
};

const getFileName = () => {
  return path.join(rootDirName, "data", "products.json");
};

const getRandomNumber = (start, end) => {
  return Math.floor(Math.random() * (start - end + 1)) + end;
};

module.exports = Product;
