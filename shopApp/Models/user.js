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

  static async addToCart(pId, user) {
    try {
      const collection = getDb().collection("users");
      if (user !== null) {
        if (user.cart === undefined) {
          await collection.updateOne({ _id: mongodb.ObjectID(user._id) }, { $set: { "cart.items": [{ productId: mongodb.ObjectID(pId), qty: 1 }] } });
        } else {
          const updatedCart = user.cart.items;
          const existingItemIndex = updatedCart.findIndex((item) => {
            if (item.productId == pId) {
              return item;
            }
          });

          if (existingItemIndex != -1) {
            updatedCart[existingItemIndex].qty = updatedCart[existingItemIndex].qty + 1;
          } else {
            updatedCart.push({ productId: mongodb.ObjectID(pId), qty: 1 });
          }
          await collection.updateOne({ _id: mongodb.ObjectID(user._id) }, { $set: { "cart.items": updatedCart } });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async removeFromCart(pId, user) {
    try {
      const collection = getDb().collection("users");
      if (user !== null) {
        if (user.cart !== undefined) {
          await collection.updateOne({ _id: mongodb.ObjectID(user._id) }, { $pull: { "cart.items": { productId: mongodb.ObjectID(pId) } } });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getCartItems(user) {
    const productIds = user.cart.items.map((item) => {
      return item.productId;
    });

    let cartProducts = await getDb().collection("products").find({ _id: { $in: productIds } }).toArray();

    cartProducts = cartProducts.map((product) => {
      let productWithQty = user.cart.items.find((item) => {
        return item.productId.toString() === product._id.toString();
      });

      product.qty = productWithQty.qty;
      return product;
    });
    return cartProducts;

  }

  static async emptyCart(user) {
    await getDb().collection("users").updateOne({ _id: new mongodb.ObjectID(user._id) }, { $unset: { cart: "" } });
  }

  static async getUserById(userid) {
    try {
      const user = getDb().collection("users").findOne({ _id: mongodb.ObjectID(userid) });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async addOrder(user) {
    try {
      let cartItems = [];

      if (user.cart != undefined) {
        cartItems = await User.getCartItems(user);
      }
      await getDb().collection("orders").insertOne({ items: cartItems, user: { _id: new mongodb.ObjectID(user._id), name: user.name } });

    } catch (error) {
      console.log(error);
    }
  }

  static async getOrders(user) {
    const orders = await getDb().collection("orders").find({ "user._id": new mongodb.ObjectID(user._id) }).toArray();
    return orders;
  }


}

module.exports = User;


