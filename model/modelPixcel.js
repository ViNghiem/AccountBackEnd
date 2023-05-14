const mongoose = require("mongoose");

const PixcelSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }

);

module.exports = mongoose.model("Pixcel", PixcelSchema);