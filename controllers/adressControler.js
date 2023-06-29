const jwt = require('jsonwebtoken')
const User = require("../model/UserModel");


const Address = require("../model/adressModel");
const addressControler = {
  addAdress: async (req, res) => {
    try {
      const idUser =req.user.id
      const newAddress = await new Address({
        userID:idUser,
        idProvince: req.body.Province,
        idDistrict: req.body.District,
        idCommune:req.body.Commune,
        idVillage: req.body.Village,
        idaddress: req.body.address,
      });

      const adress = await newAddress.save();
        const user = User.findById(idUser);
        await User.updateOne({ $push: { adress: adress._id } });
        res.status(500).json(adress);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  getAll: async (req,res) =>{
    try {
      const idUser =req.user.id
      const list = await Address.find({userID:idUser})
      console.log(list)
      res.status(200).json(list);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  update: async (req,res) =>{
    console.log(req)
  },


}

module.exports = addressControler;