const mongoose = require("mongoose");



const attributesSchema = new mongoose.Schema({
  
  name:{
    type:String,
    required: true
  },
  values:[String],


  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attributes", attributesSchema);
