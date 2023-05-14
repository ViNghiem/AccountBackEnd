const jwt = require('jsonwebtoken')
const Cart = require("../../model/Cart/CartModel");




const Cartcontroler = {
  addCart: async (req, res) => {
    try {
     
      const _Mystore_key = req.cookies._Mystore_key
      const retuurl = req.body.return_url
      console.log("_Mystore_key",_Mystore_key)
      console.log("req",req.body.id)
      
      const id_incart = await Cart.findOne({ idPicel: _Mystore_key })
      console.log("id_incart",id_incart)
      if(id_incart){
        console.log("ASdasdas")
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
       



     

      // res.send(retuurl)
      res.redirect('/product/'+retuurl)
      // res.status(500).json({mess:"add thanh com"})



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
      const cart = await Cart.findOne({ _id: id });
      res.status(500).json(cart)
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }

}

module.exports = Cartcontroler ;