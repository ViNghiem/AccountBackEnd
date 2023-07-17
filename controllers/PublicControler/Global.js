
const jwt = require('jsonwebtoken')
const Cart = require("../../model/Cart/CartModel");
const Product = require("../../model/Product/ProductModel")





const setGlooBal = async (req, res,next) => {
  
  try {
    const index = process.env.INDEX_URL


    
    console.log(index,"index")
    const _Mystore_key = req.cookies._Mystore_key
    const id = req.body.id
    console.log("_Mystore_key",_Mystore_key)
    const cart = await Cart.findOne({ idPicel: _Mystore_key });
    if(cart){
      await Cart.findOne({ idPicel: _Mystore_key })
      .populate('items.product_id')
      .exec(function(err,cart_items) {
        if (err) {
    
        } else {
          const quantity = cart_items.items.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.quantity;
              }, 0);
            
          const total_price = cart_items.items.reduce((accumulator, currentItem) => {
            console.log(currentItem)
            return accumulator + currentItem.product_id.price * currentItem.quantity;
          }, 0);
          var arr =[]
          var arr2 =[]
          cart_items.items.map(e =>{
            const {...item} = e._doc
            console.log("item",item)
            arr.push(item)
          })

          arr.map(e =>{
            const {...item} = e.product_id._doc
            item.quantity = e.quantity
            console.log("item",item)
            arr2.push(item)
          })
          const Cart = {
            items: arr2,
            total_price: total_price,
            Quantity_InCart:quantity
          }
          req.cart = Cart
          next();
            
        }
      })
 
    }else {
      const Cart = {
        items: [],
        total_price: 0,
        Quantity_InCart:0
      }
      req.cart = Cart
      next();
     
    }
  } catch (err) {
    const Cart = {
      items: [],
      total_price: 0,
      Quantity_InCart:0
    }
    req.cart = Cart
      next();
  }
};




module.exports = {
  setGlooBal
};
