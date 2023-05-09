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

  attributes:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Attributes"
      }
  ],

  price: {
    type: Number,
    required: true
  },
  images: [{
    type: String
   }],

  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Review"
   }], 

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
