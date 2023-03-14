const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: String,
  image_path: String,
  created_at: {
      type: Date,
      default: Date.now
  }
  });

module.exports = mongoose.model("Image", ImageSchema);
