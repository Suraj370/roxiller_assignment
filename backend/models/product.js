const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    required: true,
    type: Number,
    unique: true,
  },
  title: {
    required: true,
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
  },
  dateOfSale: {
    type: Date,
    required: true,
  },
});
productSchema.index({ title: "text", description: "text" });
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
