// const jwt = require('jsonwebtoken')
const Cart = require("../../model/Cart/CartModel")



const OrderControler = {
  getProduct: async(id) => {
    const product = await Product.findOne({_id:id})
    return product;
  },


  creatOrder: async (req, res) => {
    try {
      const _Mystore_key = req.cookies._Mystore_key
      console.log(_Mystore_key,"_Mystore_key")
      const id_incart = await Cart.findOne({ idPicel: _Mystore_key })




      console.log(id_incart,"id_incart")


    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  viewOrder: async (req, res) => {
    try {
      const _Mystore_key = req.cookies._Mystore_key
      console.log(_Mystore_key,"_Mystore_key")
      const InfoCart = await Cart.findOne({ idPicel: _Mystore_key })
      var listIdProduct = [];

      for( let item of InfoCart.items ){
       listIdProduct.push(OrderControler.getProduct(item.product_id))
        
      }
      



      console.log(InfoCart,"InfoCart")
      res.render('checkout',{title:'Giỏ Hàng'});


    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

}

module.exports = OrderControler ;

 // const InfoCart = await Cart.findOne({ idPicel: _Mystore_key }).populate('Cart')