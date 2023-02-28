const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");
const sha256 = require("sha256")
const jwt = require('jsonwebtoken')






const authController = {

  generateAccessToken:(user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "3000s" }
    );

  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  
  }




};




module.exports = authController;