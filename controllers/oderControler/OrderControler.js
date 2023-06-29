// const jwt = require('jsonwebtoken')
const Cart = require("../../model/Cart/CartModel")
const { Liquid } = require('liquidjs');
const axios = require('axios');
const crypto = require('crypto');

const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment');


const engine = new Liquid();


const OrderControler = {
  // getProduct: async(id) => {
  //   const product = await Product.findOne({_id:id})
  //   return product;
  // },

  creatOrder: async (req, res) => {
    // try {

    //   res.render('CreateOrder');
    // } catch (err) {
    //   console.log(err)
    //   res.status(500).json(err);
    // }
  
    try {
      const Global = req.cart
      console.log(req.body,"jkdyjashdjhsakjhajkh")
      const _Mystore_key = req.cookies._Mystore_key
     
      const id_incart = await Cart.findOne({ idPicel: _Mystore_key })
      console.log(Global)
      if(req.body.payment_method ==='cod'){

      }else{

        const config = {
          app_id: "2553",
          key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
          key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
          endpoint: "https://sb-openapi.zalopay.vn/v2/create"
      };
      
      const embed_data = {
        name: req.body.order.full_name
      };
      
      const items = Global.items;
      const transID = Math.floor(Math.random() * 1000000);
      const order = {
          app_id: config.app_id,
          app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
          app_user: req.body.order.full_name,
          app_time: Date.now(), 
          item: JSON.stringify(items),
          embed_data: JSON.stringify(embed_data),
          amount: Global.total_price,
          description: `${req.body.order.note} #${transID}`,
          bank_code: "zalopayapp",
      };
      
     
      const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
      order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
      axios.post(config.endpoint, null, { params: order })
      .then(respo => {
          console.log(respo.data);
          res.redirect(respo.data.order_url) 
          // res.send('<script>window.location.href = "res.data.order_url}";</script>');
      })
      .catch(err => console.log(err)); 

        
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'An error occurred while creating payment' });
    }

  },

  viewOrder: async (req, res) => {
    try {
   
      const Global = req.cart
      const _Mystore_key = req.cookies._Mystore_key
      console.log(_Mystore_key,"_Mystore_key")
      // const id_incart = await Cart.findOne({ idPicel: _Mystore_key })
      // console.log(id_incart,"id_incart")
      res.render('CreateOrder',{global:{cart:Global}});
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

}

module.exports = OrderControler ;

 // const InfoCart = await Cart.findOne({ idPicel: _Mystore_key }).populate('Cart')