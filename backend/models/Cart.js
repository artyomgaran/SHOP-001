const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        item_id: { type: String, required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    total_price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
