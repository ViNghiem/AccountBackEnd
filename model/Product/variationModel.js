const mongoose = require("mongoose");



const VariationsSchema = new mongoose.Schema({
  
  name:{
    type:String,
    required: true
  },
  
  idProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },

  price:{
    type: Number,
    required: true
  },

  tittle:{
    type:String,
    required: true
  },

  images: [{
    type: String
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

module.exports = mongoose.model("Variations", attributesSchema);
