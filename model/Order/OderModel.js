const mongoose = require('mongoose');
const Product = require('../Product/ProductModel')
const { Schema } = mongoose;


const orderSchema = new Schema({



  full_name:{
    type: String, 
    required: true 
  },

  address : {
    type: String, 
    required: true 
  },

  payment_method:{
    type: String, 
    required: true 
  },


  province_id : {
    type: String, 
    required: true 
  },

  district_id : {
    type: String, 
    required: true 
  },

  commune_id : {
    type: String, 
    required: true 
  },

  email:{
    type: String
  },


  phone_number:{
    type: String, 
    required: true 
  },

  note: {
    type: String
  },

  totalAmount: {
     type: Number,
      required: true
   },
 
  orderDate: {
    type: Date,
    default: Date.now 
  },

  deliveryDate: { 
    type: Date 
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
    },
});





module.exports = mongoose.model('Order', orderSchema);
