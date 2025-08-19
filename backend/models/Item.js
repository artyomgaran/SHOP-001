const mongoose = require("mongoose");
const validator = require("validator");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    structure: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    print: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img_url: {
      type: String,
      required: true,
      validate: {
        validator: isURL,
        message: "Image URL is not valid",
      },
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
