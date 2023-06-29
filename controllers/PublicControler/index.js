const Product = require("../../model/Product/ProductModel");
const Categori = require("../../model/Category/CategoryModel")
const cookieParser = require('cookie-parser');
const Pixcel = require("../../model/modelPixcel")
const { Liquid } = require('liquidjs');
const {setGlooBal} = require('./Global')


const engine = new Liquid();



const IndexControler = {
  getIndex: async (req, res) => {
    try {
      const Global = req.cart
        console.log(req,"req")
        res.render('index',{template:{title:'index'},global:{cart:Global}});
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  getLogin: async (req, res) => {
    try {
      const Global = req.cart
      res.render('login',{template:{title:'login'},global:{cart:Global}});
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  getCartVeiw: async (req, res) => {
    try {
      const Global = req.cart
      res.render('Cart',{template:{title:'login'},global:{cart:Global}});
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },



  getCategory: async (req, res) => {
    try {
      console.log(req.params.slug)
      const categori = await Categori.findOne({slug:req.params.slug})
      const lisProduct = categori.listProduct
      console.log(lisProduct,"lisProduct")
      const {...category } = categori._doc;
      console.log(category,"category")
      const promises = lisProduct.map(productId => {
        return Product.findById(productId).exec();
      });

    Promise.all(promises)
      .then(products => {
        var arr =[]
        products.map(e=>{
          const {...item} = e._doc
          arr.push(item)
        })
        category.listProduct = arr
        console.log(arr,"arr")
        res.render('categori',{template:{category}});
      })
      .catch(error => {
        console.log('Lỗi: ', error);
      }); 
    } catch (err) {
      res.status(500).json(err);
    }
  },


  
  getProduct: async (req, res) => {
    try {
      
      console.log(req.cart,"sadsajkdksah")
      
      console.log(req.params.slug)
      const Global = req.cart
      
      const data = await Product.findOne({slug:req.params.slug})
      console.log(Product,"product")
      const {...product } = data._doc;
      // const {...global} =Global._doc;
      // console.log(Global,"Global")
      res.render('product',{template:{product},global:{cart:Global}});
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  
}

module.exports = IndexControler ;









