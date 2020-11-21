const mongodb = require("mongodb");
const { getDb } = require("./../utils/database");


class Product {

  constructor(pname, pdescription, price, img_url = "", sellerId) {
    this.productName = pname;
    this.productDescription = pdescription;
    this.price = price;
    this.img_url = img_url;
    this.sellerId = sellerId;
  }

  async save() {
    try {
      const collection = getDb().collection("products");
      await collection.insertOne(this);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProduct(pid, pname, pdescription, productPrice) {
    try {
      const collection = getDb().collection("products");
      const selector = { _id: new mongodb.ObjectId(pid) };
      const updatedValues = { $set: { productName: pname, productDescription: pdescription, price: productPrice } };
      await collection.updateOne(selector, updatedValues);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteProduct(pid) {
    try {
      const collection = getDb().collection("products");
      await collection.deleteOne({ _id: new mongodb.ObjectID(pid) });
    } catch (error) {
      console.log(error);
    }
  }

  static async getProductById(pid) {
    try {
      const collection = getDb().collection("products");
      const product = await collection.findOne({ _id: new mongodb.ObjectId(pid) });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllProducts() {
    try {
      const collection = getDb().collection("products");
      const products = await collection.find().toArray();
      return products
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = Product;
