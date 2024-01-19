// const jwt = require('jsonwebtoken')
const Cart = require("../../model/Cart/CartModel")
const { Liquid } = require('liquidjs');
const axios = require('axios');
const crypto = require('crypto');
const Order = require("../../model/Order/OderModel")
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment');
const OrderItem = require('../../model/Order/ItemOrder')
const User = require('../../model/UserModel')
const WarehauseAddress = require('../../model/Order/WarehauseAddress')

var dotenv = require("dotenv");
dotenv.config();

const engine = new Liquid();
const Domain = process.env.Domain

function getMinBill(mang) {
  if (mang.length === 0) {
    return null;
  }
  let obj = mang[0]
  let giaTriNhoNhat = mang[0].totalbill;
  for (let i = 1; i < mang.length; i++) {
    if (mang[i].totalbill < giaTriNhoNhat) {
      obj = mang[i];
    }
  }
  
  return  obj;
}


function createHmacSha256Signature(data) {
  const hmac = crypto.createHmac('sha256', `eiDZpRyiAjjMu5TnU6Cn1xJzvTYE3MmN`);
  hmac.update(data);
  return hmac.digest('hex');
}

async function getShipping(idProvince,idDistrict,idCommune){
  const Warehouse =  await WarehauseAddress.findOne()
  if(idProvince === Warehouse.idProvince){
    let checkidDistrict = Warehouse.listIdDistrict.filter(e =>{
      return e === idDistrict
    })
      if(checkidDistrict.length > 0){
        return Warehouse.Uban
      }else{
        return Warehouse.Sububan
      }
  }else{
    return Warehouse.Sububan
  }
}





const OrderControler = {
  creatOrder: async (req, res) => {
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
  
      const _Mystore_key = req.cookies._Mystore_key
      const id_incart = await Cart.findOne({ idPicel: _Mystore_key })
      // console.log(Global)
      // console.log('listUser---------------------------------')
      const listUser = await User.find({role:'approved',isAdmin:false})
      // console.log('listUser---------------------------------',listUser)
    
    //   const listDataUserKPI = listUser.map( async (user)=> {
    //    let total =await user.getTotalBill()
    //   return {...user,TotalBill:total} 
    // })

    const listDataUserKPI = await Promise.all(listUser.map(async (e) => {
        let bill = await e.getTotalBill()
        const {...user } = e._doc
        user.totalbill = bill
        return(user)
    }));

    // listDataUserKPI.filter

    // console.log("listDataUserKPI",listDataUserKPI)
    const userStaffHandlingLsy = await getMinBill(listDataUserKPI)
    const shippingValue = await getShipping(req.body.order.province_id,req.body.order.district_id,req.body.order.commune_id)
    const totalAmount = req.cart.total_price + shippingValue


   
      const  Bill = await new Order({
        full_name:req.body.order.full_name,
        address:req.body.order.address,
        province_id:req.body.order.province_id,
        district_id:req.body.order.district_id,
        commune_id:req.body.order.commune_id,
        phone_number:req.body.order.phone_number,
        email:req.body.order.email,
        note:req.body.order.note,
        shippingfee:shippingValue,
        provisional:req.cart.total_price,
        payment_method:req.body.payment_method,
        totalAmount: totalAmount ,
        StaffHandlingLsy:userStaffHandlingLsy._id
      });
      const OrderBill = await Bill.save();
      const addItem = await ListItemOrder.map(item =>{
       const newitem =  new OrderItem({
          name:item.name,
          idOrder:OrderBill._id,
          price:item.price,
          quatity:item.quantity,
          images:item.images[0]
        })
        return newitem.save()
      })
      if(req.body.payment_method ==='cod'){

        res.redirect(`/ordersucces?orderId=${OrderBill._id}`)




        
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
          // console.log(respo.data);
          res.redirect(respo.data.order_url) 
          // res.send('<script>window.location.href = "res.data.order_url}";</script>');
      })
      .catch(err => console.log(err)); 

      }else {
        const gia = OrderBill.totalAmount;
        const orderId = OrderBill._id.toString();
        const amount  = gia.toString()
        // console.log(typeof amount )
        const endpoint = 'https://test-payment.momo.vn/gw_payment/transactionProcessor';
        const returnUrl = `${Domain}/ordersucces`;
        const requestPayload = {
          partnerCode: 'MOMOEOXC20220521',
          accessKey: 'ir0gmkqQG4wTOcAd',
          requestId: orderId,
          amount,
          orderId,
          orderInfo: Bill.full_name + 'thanh toán đơn hàng ' + orderId,
          returnUrl,
          notifyUrl: Domain,
        
        };
      
      
        const row =`partnerCode=${requestPayload.partnerCode}&accessKey=${requestPayload.accessKey}&requestId=${requestPayload.requestId}&amount=${requestPayload.amount}&orderId=${requestPayload.orderId}&orderInfo=${requestPayload.orderInfo}&returnUrl=${requestPayload.returnUrl}&notifyUrl=${requestPayload.notifyUrl}&extraData=`
        // console.log('row',row)
        const datass = JSON.stringify(requestPayload);
        // console.log('Empty',datass)
        const signature = createHmacSha256Signature(row);
        // console.log('signature',signature)
        const requestType= 'captureMoMoWallet'
        const headers = {
          'Content-Type': 'application/json',
        };
      
        const requestData = {
          ...requestPayload,
          requestType,
          signature,
        };
      
   
      
        try {
          const response = await axios.post(endpoint, requestData, { headers });
          // console.log('Momo response:', response.data);
      
          res.redirect(response.data.payUrl) 
        } catch (error) {
          console.error('Error making payment request:', error.message);
        }




      }
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'An error occurred while creating payment' });
    }

  },

  ordersucces:async(req,res)=>{
    try {
      const orderId = req.query.orderId
      const _Mystore_key = req.cookies._Mystore_key

      const infoOrder = await Order.findOne({_id:orderId})
      // console.log('infoOrder',infoOrder)
      const {...infoOrders} = infoOrder._doc

      const orderItem = await OrderItem.find({idOrder:orderId })
      var arr =[]
      orderItem.map(e=>{
         
          const {...item} = e._doc
          arr.push(item)
        })

      await Cart.deleteOne({ idPicel: _Mystore_key })
      const Global = req.cart
      // console.log('orderItem',orderItem)  
      // res.status(200).json({mess:req.query.message,orderItem:orderItem,infoOrder:infoOrder})
      res.render('Odersucces',{template:{title:'Mua hàng thành công',order_items:arr,infoOrder:infoOrders},global:{cart:Global}});
    } catch (error) {
      // console.log(error)
      res.status(500).json({error:error})
    }
  }

}

module.exports = OrderControler ;

 // const InfoCart = await Cart.findOne({ idPicel: _Mystore_key }).populate('Cart')