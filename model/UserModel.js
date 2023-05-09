const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      max: 20,
      unique: false,
    },
    
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },

    phone: {
      type: String,
      required: false,
      max: 50,
      unique: true,
    },

    adress: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Address"
    }],

    avartar : {
      type: String,
    
      max: 50,
     
    },

    idZalo: {
      type: String
    },

    password: {
      type: String,
      required: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
