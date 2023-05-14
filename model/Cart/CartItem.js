const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number,
    required: true 
  },

  subtotal: {
     type: Number,
     required: true
    }
});

module.exports = mongoose.model("CartItem", CartItemSchema);
