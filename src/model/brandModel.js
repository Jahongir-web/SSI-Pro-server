const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    default: "",
  },
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Brand", brandSchema)