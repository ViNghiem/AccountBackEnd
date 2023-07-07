// const jwt = require('jsonwebtoken')
const Cart = require("../../model/Cart/CartModel")
const { Liquid } = require('liquidjs');
const axios = require('axios');
const crypto = require('crypto');
const Order = require("../../model/Order/OderModel")
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment');
const orderItem = require('../../model/Order/ItemOrder')

const engine = new Liquid();


const OrderControler = {


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

  creatOrderMomo: async (req, res) => {
    try {
      const Global = req.cart
      const ListItemOrder =  req.cart.items
      console.log(req.body,"jkdyjashdjhsakjhajkh")
      const _Mystore_key = req.cookies._Mystore_key
     
      const id_incart = await Cart.findOne({ idPicel: _Mystore_key })
      console.log(Global)
      if(req.body.payment_method ==='cod'){
        res.redirect( response.data.payUrl)
      }else if(req.body.payment_method ==='zalopay'){
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
      
      
      
      
      
      
      else {






        
      const  Bill = await new Order({
        full_name:req.body.order.full_name,
        address:req.body.order.address,
        province_id:req.body.order.province_id,
        district_id:req.body.order.district_id,
        commune_id:req.body.order.commune_id,
        phone_number:req.body.order.phone_number,
        email:req.body.order.email,
        note:req.body.order.note,
        payment_method:req.body.payment_method,
        totalAmount:req.cart.total_price
      });
      const OrderBill = await Bill.save();
      const addItem = ListItemOrder.map(item =>{
       const newitem = new orderItem({
          name:item.name,
          idOrder:OrderBill._id,
          price:item.price,
          quatity:item.quantity,
          images:item.images[0]
        })
        return newitem.save()
      })






      console.log("OrderBill",OrderBill._id.toString())




        const accessKey = 'ir0gmkqQG4wTOcAd';
        const secretKey = 'eiDZpRyiAjjMu5TnU6Cn1xJzvTYE3MmN';
        const orderInfo = OrderBill.note;
        const partnerCode = 'MOMOEOXC20220521';
        const redirectUrl = 'http://localhost:3020/ordersucces';
        const ipnUrl = 'http://localhost:3020/';
        const requestType = 'payWithMethod';
        const amount = OrderBill.totalAmount;
        const orderId = OrderBill._id.toString();
        const requestId = orderId;
        const extraData = '';
        const paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
        const orderGroupId = '';
        const autoCapture = true;
        const lang = 'vi';

      
      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

      
      const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
      console.log("signature",signature)

      const requestBody = {
        partnerCode: partnerCode,
        partnerName: 'vinghiem',
        storeId: 'vinghiem',
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
      }

      axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody)
        .then(response => {
          console.log('Response:');
          console.log(response.data);
          console.log('resultCode:');
          console.log(response.data.resultCode.payUrl);
          res.redirect( response.data.payUrl)
        })
        .catch(error => {
          console.log('Error:', error);
        });






      }
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'An error occurred while creating payment' });
    }

  },

  ordersucces:async(req,res)=>{
    try {

      console.log(req)
      // Odersucces
      res.status(200).json({mess:req.query.message})
      
    } catch (error) {
      res.status(500).json({error:error})
    }
  }

}

module.exports = OrderControler ;

 // const InfoCart = await Cart.findOne({ idPicel: _Mystore_key }).populate('Cart')