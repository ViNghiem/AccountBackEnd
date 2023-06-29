const mongoose = require("mongoose");



const categoriSchema = new mongoose.Schema({
  
  name:{
    type:String,
    required: true
  },

  Image:{
    type:String
  },

  slug:{
    type:String
  },

  listProduct:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  }],
  description:{
    type:String
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

module.exports = mongoose.model("Categori", categoriSchema);
