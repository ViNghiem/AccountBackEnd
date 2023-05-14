const Product = require("../../model/Product/ProductModel");

const cookieParser = require('cookie-parser');
const Pixcel = require("../../model/modelPixcel")
const IndexControler = {
  getIndex: async (req, res) => {
    try {
      
        res.render('index',{title:'index'});
     
      

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  getLogin: async (req, res) => {
    try {
      res.render('login',{title:'login'});

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },


  getCategory: async (req, res) => {
    try {
      res.render('categories',{title:'categories'});

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },


  
  getProduct: async (req, res) => {
    try {
      console.log(req.params.slug)
      const product = await Product.findOne({slug:req.params.slug})
      // res.status(200).json(product)
 
      res.render('product',{product});

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  
}

module.exports = IndexControler ;









