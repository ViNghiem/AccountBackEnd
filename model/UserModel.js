const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
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
      unique: false,
      sparse: true,
    },

    adress: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Address"
    }],

    avartar : {
      type: String,
      max: 50,
    },

    Zaloid: {
      type: String
    },

    Googleid: {
      type: String
    },

    password: {
      type: String,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
    },



  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
