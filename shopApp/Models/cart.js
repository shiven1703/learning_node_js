const fs = require("fs").promises;
const path = require("path");

const Product = require("./../Models/product");
const rootDirName = require("../utils/path");
const { resolve } = require("path");

class Cart {
  static async addProduct(productId) {
    const cartData = await getCartDataFromFile();
    const productIndex = await Cart.getProductIndexById(productId);

    if (productIndex === -1) {
      cartData.products.push({ pid: productId, qty: 1 });
    } else {
      cartData.products[productIndex].qty =
        cartData.products[productIndex].qty + 1;
    }
    await saveCartDataToFile(cartData);
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
    const [cartData, products] = await Promise.all([
      getCartDataFromFile(),
      Product.getAllProducts(),
    ]);
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

const getCartDataFromFile = async () => {
  let cartData = { products: [] };
  let fileName = getFileName();
  try {
    let data = await fs.readFile(fileName);
    cartData = JSON.parse(data);
  } catch (error) {}

  return cartData;
};

const saveCartDataToFile = async (cartData) => {
  let fileName = getFileName();
  try {
    await fs.writeFile(fileName, JSON.stringify(cartData));
  } catch (error) {
    console.log(error);
  }
};

const getFileName = () => {
  return path.join(rootDirName, "data", "cart.json");
};

module.exports = Cart;
