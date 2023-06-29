const mongoose = require('mongoose');
const Product = require('./Product/ProductModel')
const { Schema } = mongoose;


const orderSchema = new Schema({
  orderNumber: { type: String, required: true },
  customer: { type: String, required: true },
  cart_id: {
      type: Schema.Types.ObjectId,
      ref: 'Cart', 
      required: true
  },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
    },
});





module.exports = mongoose.model('Order', orderSchema);

