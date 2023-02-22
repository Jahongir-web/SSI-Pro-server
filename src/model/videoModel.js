const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Video", videoSchema)