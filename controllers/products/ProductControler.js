const jwt = require('jsonwebtoken')
const product = require("../../model/Product/ProductModel");
const ProductControler = {
  addProduct: async (req, res) => {
    try {

      


      console.log(req.body)

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },





}

module.exports = ProductControler ;