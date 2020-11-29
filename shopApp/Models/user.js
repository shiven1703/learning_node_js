const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, required: true },
      },
    ],
  },
});

userSchema.statics.authenticate = async (userEmail, userPassword) => {
  try {
    const user = await mongoose
      .model("User")
      .findOne({ email: userEmail, password: userPassword });
    if (user !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

userSchema.statics.addToCart = async (pid, user) => {
  try {
    if (user !== null) {
      if (user.cart === undefined) {
        await mongoose.model("User").updateOne(
          { _id: mongoose.Types.ObjectId(user._id) },
          {
            $set: {
              "cart.items": [{ product: mongoose.Types.ObjectId(pid), qty: 1 }],
            },
          }
        );
      } else {
        const updatedCart = user.cart.items;
        const existingItemIndex = updatedCart.findIndex((item) => {
          if (item.product == pid) {
            return item;
          }
        });

        if (existingItemIndex != -1) {
          updatedCart[existingItemIndex].qty =
            updatedCart[existingItemIndex].qty + 1;
        } else {
          updatedCart.push({
            product: mongoose.Types.ObjectId(pid),
            qty: 1,
          });
        }
        await mongoose
          .model("User")
          .updateOne(
            { _id: mongoose.Types.ObjectId(user._id) },
            { $set: { "cart.items": updatedCart } }
          );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

userSchema.statics.removeFromCart = async (pid, user) => {
  try {
    if (user !== null) {
      if (user.cart !== undefined) {
        await mongoose.model("User").updateOne(
          { _id: mongoose.Types.ObjectId(user._id) },
          {
            $pull: {
              "cart.items": { product: mongoose.Types.ObjectId(pid) },
            },
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

userSchema.statics.getCartItems = async (user) => {
  const u = await mongoose
    .model("User")
    .findOne({
      _id: mongoose.Types.ObjectId(user._id),
    })
    .populate("cart.items.product");

  return u.cart.items;
};

userSchema.statics.addOrder = async (cartItems) => {
  try {
    await mongoose
      .model("")
      .insertOne({
        items: cartItems,
        user: { _id: new mongodb.ObjectID(user._id), name: user.name },
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", userSchema);

// class User {
//   constructor(name, password, email) {
//     this.name = name;
//     this.password = password;
//     this.email = email;
//   }

//   async save() {
//     try {
//       const collection = getDb().collection("users");
//       await collection.insertOne(this);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async authenticate(userEmail, userPassword) {
//     try {
//       const collection = getDb().collection("users");
//       console.log(userEmail, userPassword);
//       const user = collection.findOne({ email: userEmail, password: userPassword });
//       return user;

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async addToCart(pId, user) {
//     try {
//       const collection = getDb().collection("users");
//       if (user !== null) {
//         if (user.cart === undefined) {
//           await collection.updateOne({ _id: mongodb.ObjectID(user._id) }, { $set: { "cart.items": [{ productId: mongodb.ObjectID(pId), qty: 1 }] } });
//         } else {
//           const updatedCart = user.cart.items;
//           const existingItemIndex = updatedCart.findIndex((item) => {
//             if (item.productId == pId) {
//               return item;
//             }
//           });

//           if (existingItemIndex != -1) {
//             updatedCart[existingItemIndex].qty = updatedCart[existingItemIndex].qty + 1;
//           } else {
//             updatedCart.push({ productId: mongodb.ObjectID(pId), qty: 1 });
//           }
//           await collection.updateOne({ _id: mongodb.ObjectID(user._id) }, { $set: { "cart.items": updatedCart } });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async removeFromCart(pId, user) {
//     try {
//       const collection = getDb().collection("users");
//       if (user !== null) {
//         if (user.cart !== undefined) {
//           await collection.updateOne({ _id: mongodb.ObjectID(user._id) }, { $pull: { "cart.items": { productId: mongodb.ObjectID(pId) } } });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async getCartItems(user) {
//     const productIds = user.cart.items.map((item) => {
//       return item.productId;
//     });

//     let cartProducts = await getDb().collection("products").find({ _id: { $in: productIds } }).toArray();

//     cartProducts = cartProducts.map((product) => {
//       let productWithQty = user.cart.items.find((item) => {
//         return item.productId.toString() === product._id.toString();
//       });

//       product.qty = productWithQty.qty;
//       return product;
//     });
//     return cartProducts;

//   }

//   static async emptyCart(user) {
//     await getDb().collection("users").updateOne({ _id: new mongodb.ObjectID(user._id) }, { $unset: { cart: "" } });
//   }

//   static async getUserById(userid) {
//     try {
//       const user = getDb().collection("users").findOne({ _id: mongodb.ObjectID(userid) });
//       return user;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async addOrder(user) {
//     try {
//       let cartItems = [];

//       if (user.cart != undefined) {
//         cartItems = await User.getCartItems(user);
//       }
//       await getDb().collection("orders").insertOne({ items: cartItems, user: { _id: new mongodb.ObjectID(user._id), name: user.name } });

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   static async getOrders(user) {
//     const orders = await getDb().collection("orders").find({ "user._id": new mongodb.ObjectID(user._id) }).toArray();
//     return orders;
//   }

// }

// module.exports = User;
