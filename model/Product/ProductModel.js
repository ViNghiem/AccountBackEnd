  const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  slug:{
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  quatity: {
    type: Number,
    required: true
  },

  images: [{
    type: String
   }],

   category:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Categori"
    }
  ],


  variations:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Variations"
    }
  ],


  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
