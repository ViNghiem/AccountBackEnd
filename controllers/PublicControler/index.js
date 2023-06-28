const Product = require("../../model/Product/ProductModel");

const cookieParser = require('cookie-parser');
const Pixcel = require("../../model/modelPixcel")
const { Liquid } = require('liquidjs');
const engine = new Liquid();



const IndexControler = {
  getIndex: async (req, res) => {
    try {
        console.log(req,"req")
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
      const data = await Product.findOne({slug:req.params.slug})


      console.log(Product,"product")
      const {...product } = data._doc;
  
      res.render('product',{template:{product}});

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  
}

module.exports = IndexControler ;









