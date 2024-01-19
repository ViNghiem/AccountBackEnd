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

  provisional:{
    type: Number,
      required: true
  },

  totalAmount: {
     type: Number,
      required: true
   },

  shippingfee:{
    type: Number,
    required: false,
    default: 0
  },

  discount:{
    type: Number,
    required: false,
    default: 0
  },
 
  orderDate: {
    type: Date,
    default: Date.now 
  },

  deliveryDate: { 
    type: Date 
  },

  StaffHandlingLsy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  UpdateStatus:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  status: {
    type: String,
    enum: ['pending','Confirm','shipped','Cancel order','delivered','Refund-form'],
    default: 'pending'
  },



});





module.exports = mongoose.model('Order', orderSchema);

