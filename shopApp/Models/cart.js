const fs = require("fs");
const path = require("path");

const Product = require("./../Models/product");
const rootDirName = require("../utils/path");
const { resolve } = require("path");

class Cart {
  static async addProduct(productId, productPrice) {
    const cartData = await getCartDataFromFile();
    // checking if product is already present in cart or not
    const productIndex = await Cart.getProductIndexById(productId);
    if (productIndex === -1) {
      cartData.products.push({ pid: productId, qty: 1 });
    } else {
      cartData.products[productIndex].qty =
        cartData.products[productIndex].qty + 1;
    }
    saveCartDataToFile(cartData);
  }

  static async removeProductFromCart(productId) {
    const cartData = await getCartDataFromFile();
    const updatedProducts = cartData.products.filter((product) => {
      if (product.pid !== productId) {
        return true;
      }
    });
    cartData.products = updatedProducts;
    await saveCartDataToFile(cartData);
  }

  static async getProductIndexById(productId) {
    const cartData = await getCartDataFromFile();
    let foundProductIndex = -1;
    if (cartData.products.length > 0) {
      foundProductIndex = cartData.products.findIndex(
        (product) => product.pid === productId
      );
    }
    return foundProductIndex;
  }

  static async getAllProductsFromCart() {
    const cartData = await getCartDataFromFile();
    const products = await Product.getAllProducts();
    const cartProducts = { products: [], total: 0.0 };

    cartData.products.forEach((cartProduct) => {
      let product = products.find((p) => p.productId === cartProduct.pid);
      if (product !== undefined) {
        product.qty = cartProduct.qty;
        cartProducts.total =
          cartProducts.total +
          cartProduct.qty * Number.parseFloat(product.price);
        cartProducts.products.push(product);
      }
    });

    return cartProducts;
  }
}

const getCartDataFromFile = () => {
  return new Promise((resolve, rejects) => {
    fs.readFile(path.join(rootDirName, "data", "cart.json"), (err, data) => {
      let cartData = { products: [] };
      if (!err) {
        cartData = JSON.parse(data);
      }
      resolve(cartData);
    });
  });
};

const saveCartDataToFile = (cartData) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(
      path.join(rootDirName, "data", "cart.json"),
      JSON.stringify(cartData),
      (err) => {
        resolve();
      }
    );
  });
};

module.exports = Cart;
