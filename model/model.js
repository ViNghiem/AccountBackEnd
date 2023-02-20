const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  first_name: {
    type:String,
    required:true
  },
  
  last_name: {
    type:String,
    required:true
  },

  phonnumber: {
    type:String,
    required:true
  }
})