const jwt = require('jsonwebtoken')
const attributes = require("../../model/Product/attributes");




const AttributesControler = {
  addAttributes: async (req, res) => {
    try {
      console.log(req.body)
      
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },





}

module.exports = AttributesControler ;