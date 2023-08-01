const Product = require("../../model/Product/ProductModel");
const Categori = require("../../model/Category/CategoryModel")
const cookieParser = require('cookie-parser');
const Pixcel = require("../../model/modelPixcel")
const { Liquid } = require('liquidjs');
const {setGlooBal} = require('./Global')
const axios = require('axios');

const engine = new Liquid();

function objectToQueryString(obj) {
  const keyValuePairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = encodeURIComponent(obj[key]);
      const keyValuePair = `${encodeURIComponent(key)}=${value}`;
      keyValuePairs.push(keyValuePair);
    }
  }

  return keyValuePairs.join('&');
}


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

  search: async (req, res) => {
    try {
      const Global = req.cart
      
      res.render('login',{template:{title:'login'},global:{cart:Global}});
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

 
  getTest: async(req,res) =>{
    console.log('-------------------------',req)
   let mes = req.body.name
   let phone = req.body.phone
   let tokenfroup = req.body.token

    const mess = {
       'message': `dev pancaketest ${mes} --- ${phone}` 
     }
 
     let data =objectToQueryString(mess)
    //  5gQW8t02g6me83Sn1NmqdyJp8vQbqtBUD0ALXLEPDDA
     let config = {
       method: 'post',
       maxBodyLength: Infinity,
       url: 'https://notify-api.line.me/api/notify',
       headers: { 
         'Content-Type': 'application/x-www-form-urlencoded', 
         'Authorization': `Bearer ${tokenfroup}`
       },
       data : data
     };
     
     axios.request(config)
     .then((response) => {
       console.log(JSON.stringify(response.data));
     })
     .catch((error) => {
       console.log(error);
     }); 
 
 
 
 
    res.status(200).json({mess:'dasdsadsa'})
 
 
 
      
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

      const Global = req.cart
      console.log(req.params.slug)
      const categori = await Categori.findOne({slug:req.params.slug})

      if(categori) {

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
          console.log(products)
          const {...item} = e._doc
          arr.push(item)  
        })
        category.listProduct = arr
        console.log(Global,"arr")
        res.render('categori',{template:{category},global:{cart:Global}});
      })
      .catch(error => {
        console.log('Lỗi: ', error);
      }); 

    }else{
      res.redirect( response.data.payUrl) 
    }



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









