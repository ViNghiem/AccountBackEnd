const mongoose = require("mongoose");



const ItemOrderSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },

  idOrder:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Order"
  },
  


  price: {
    type: Number,
    required: true
  },

  quatity: {
    type: Number,
    required: true
  },


  images: {
    type: String
   },





  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ItemOrder", ItemOrderSchema);
