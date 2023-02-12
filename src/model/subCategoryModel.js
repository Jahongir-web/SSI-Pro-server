const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("SubCategory", subCategorySchema)