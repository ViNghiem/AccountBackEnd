const jwt = require('jsonwebtoken')
const Cart = require("../../model/Cart/CartModel");
const Product = require("../../model/Product/ProductModel")



const Cartcontroler = {

  
  addCart: async (req, res) => {
    try {
  
      const _Mystore_key = req.cookies._Mystore_key
      const retuurl = req.body.return_url
      const CartColection = await Cart.findOne({ idPicel: _Mystore_key })
      if(CartColection){
        const idCart = CartColection._id
        const productId = req.body.id
        const quantity = parseInt(req.body.quantity)
        const itemToUpdate = CartColection.items.find(item => item.product_id.toString() === productId.toString());
        const newItem = {
          product_id: productId,
          quantity:quantity
        }
        if (itemToUpdate) {
          itemToUpdate.quantity =  itemToUpdate.quantity + quantity;
          CartColection.updateOne(
            { _id:idCart , items: { $elemMatch: { product_id: itemToUpdate.product_id } } },
            { $set: { 'items.$.quantity':  itemToUpdate.quantity } }
          )
          await  CartColection.save()
        } else {
            await Cart.updateOne(
              { _id: idCart },
              { $push: { items: newItem } }
            )
            await  CartColection.save()
        }
      }else{
        const newCart = await new Cart({
          items:[
            {
              product_id: req.body.id,
              quantity:1
            }
          ],
          idPicel:_Mystore_key,
        })
        const cart = await newCart.save()
      }
      res.redirect('/product/'+retuurl)
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },



  getCart: async (req,res)=>{
    try {
      const _Mystore_key = req.cookies._Mystore_key
      const id = req.body.id
      console.log("_Mystore_key",_Mystore_key)
      const cart = await Cart.findOne({ idPicel: _Mystore_key });
      
      return cart
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }



}

module.exports = Cartcontroler ;