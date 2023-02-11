const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
    default: "",
  },
  oldPrice: {
    type: String,
    default: "",
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  isPromotion: {
    type: Boolean,
    default: false,
  },
  subCategory: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Category", productSchema)