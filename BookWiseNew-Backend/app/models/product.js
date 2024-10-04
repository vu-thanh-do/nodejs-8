const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    promotion: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
    },
    slide: {
      type: [String],
    },
    color: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    url_book: {
      type: String,
    },
    audioUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Available", "Unvailable"],
      default: "Available",
    },
  },
  { timestamps: true },
  { collection: "product" }
);

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", ProductSchema);
