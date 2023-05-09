const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: String,
  image_path: String,
  
  created_at: {
      type: Date,
      default: Date.now
  },
  image:{
    data:Buffer,
    contentType:String
  }


  });

module.exports = mongoose.model("Image", ImageSchema);
