const mongoose = require("mongoose");



const WarehauseAddress = new mongoose.Schema({
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

  listIdDistrict:[
    {
      type: String,
      require: false,
      unique: false,
    }
  ],

  Uban: {
    type: Number,
    require: false,
    default: 0,
  },

  Sububan: {
    type: Number,
    require: false,
    default: 0,
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

module.exports = mongoose.model("WarehauseAddress", WarehauseAddress);
