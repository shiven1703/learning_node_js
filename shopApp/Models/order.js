const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: [
    {
      _id: Schema.Types.ObjectId,
      productName: String,
      productDescription: String,
      price: String,
      img_url: String,
      sellerId: String,
    },
  ],
  user: {
    _id: Schema.Types.ObjectId,
    name: String,
  },
});
