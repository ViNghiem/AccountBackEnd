const mongoose = require("mongoose");
const User = require("./UserModel")
const AdressSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    idProvince: {
      type: String,
      required: true,
      max: 50,
      unique: false,
    },

    idDistrict: {
      type: String,
      required: false,
      max: 50,
      unique: false,
    },
    idCommune : {
      type: String,
      require: false,
      unique: false,
    },

    idVillage: {
      type: String,
      required: false,
      max: 50,
      unique: false,
    },
    
    idaddress: {
      type: String,
      required: false,
      max: 20,
      unique: false,
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AdressSchema);
