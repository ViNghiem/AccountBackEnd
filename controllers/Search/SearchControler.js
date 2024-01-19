const jwt = require('jsonwebtoken')
const attributes = require("../../model/Product/attributes");




const Search = {
  ProductSearch: async (req, res) => {
    try {
      console.log(req.body)
      
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },





}

module.exports = Search ;