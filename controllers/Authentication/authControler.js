const User = require("../../model/UserModel");
const bcrypt = require("bcrypt");
var mongoose = require("mongoose");
const sha256 = require("sha256")
const jwt = require('jsonwebtoken')

const UserDb= require('../../model/UserModel')




const authController = {

  generateAccessToken:async (user) => {
    const userinDb = await UserDb.findOne({_id:user.id})
    console.log(userinDb,"sajdkjsakjd")
    return jwt.sign(
      {
        id: user.id,
        isAdmin: userinDb.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "15s" }
    );

  },

  generateRefreshToken:async (user) => {
    const userinDb = await UserDb.findOne({_id:user.id})
    
    return jwt.sign(
      {
        id: user.id,
        isAdmin: userinDb.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },


  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log("teoken------------------------------------------------------", refreshToken)
    if (!refreshToken){
       return res.status(401).json("You're not authenticated");
    }else{
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
        if (err) {
          console.log(err);
        }
     
        // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = await authController.generateAccessToken(user);
        const newRefreshToken = await authController.generateRefreshToken(user);
        // refreshTokens.push(newRefreshToken);
        console.log("newAccessToken",newAccessToken)
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure:false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({accessToken: newAccessToken});
      });
    }


  },







};




module.exports = authController; 