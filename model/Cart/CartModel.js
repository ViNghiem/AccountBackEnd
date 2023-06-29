const mongoose = require("mongoose");





const CartSchema = new mongoose.Schema({
  items: [
   {
      product_id: { 
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product', 
         required: true 
       },
       quantity: { 
         type: Number,
         required: true 
       },
   }
  ],

  idPicel:{
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Pixcel', 
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   }




});





module.exports = mongoose.model("Cart", CartSchema);
