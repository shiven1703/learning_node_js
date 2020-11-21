const mongodb = require("mongodb");
const { getDb } = require("./../utils/database");
const { getProductById } = require("./product");

class User {
  constructor(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
  }

  async save() {
    try {
      const collection = getDb().collection("users");
      await collection.insertOne(this);
    } catch (error) {
      console.log(error);
    }
  }

  static async authenticate(userEmail, userPassword) {
    try {
      const collection = getDb().collection("users");
      console.log(userEmail, userPassword);
      const user = collection.findOne({ email: userEmail, password: userPassword });
      return user;

    } catch (error) {
      console.log(error);
    }
  }

  static async addToCart(productId, product, userid) {
    try {
      const collection = getDb().collection("users");
      const user = await collection.findOne({ _id: mongodb.ObjectID(userid) });
      if (user !== null) {
        if (user.cart === undefined) {
          await collection.updateOne({ _id: mongodb.ObjectID(userid) }, { $push: { "cart.items": { ...product, qty: 1, _id: mongodb.ObjectID(productId) } } });
        } else {
          const existingProduct = user.cart.items.find((item) => {
            return item._id == productId;
          });

          if (existingProduct) {
            await collection.updateOne({ "cart.items": { $elemMatch: { _id: mongodb.ObjectID(existingProduct._id) } } }, { $inc: { "cart.items.$.qty": 1 } });
          } else {
            await collection.updateOne({ _id: mongodb.ObjectID(userid) }, { $push: { "cart.items": { ...product, qty: 1, _id: mongodb.ObjectID(productId) } } });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async removeFromCart(productId, userid) {
    try {
      const collection = getDb().collection("users");
      const user = await collection.findOne({ _id: mongodb.ObjectID(userid) });
      if (user !== null) {
        if (user.cart !== undefined) {
          await collection.updateOne({ _id: mongodb.ObjectID(userid) }, { $pull: { "cart.items": { _id: mongodb.ObjectID(productId) } } });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(userid) {
    try {
      const user = getDb().collection("users").findOne({ _id: mongodb.ObjectID(userid) });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;


