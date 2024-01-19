const mongoose = require("mongoose");
const Order = require("../model/Order/OderModel")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
      max: 50,
      unique: false,
      sparse: true,
    },

    adress: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Address"
    }],

    avartar : {
      type: String,
      max: 50,
    },

    Zaloid: {
      type: String
    },

    Googleid: {
      type: String
    },

    password: {
      type: String,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending'
    },
  },
  { timestamps: true }
);


userSchema.methods.getTotalBill = async function () {
  const userId = this._id;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonth = now.getMonth() === 11 ? 0 : now.getMonth() + 1;
  const endOfMonth = new Date(now.getFullYear(), nextMonth, 0);
  const orderCount = await Order.countDocuments({
    StaffHandlingLsy: userId,
    createdAt: { $gte: startOfMonth, $lt: endOfMonth },
  });
  return orderCount;
};




module.exports = mongoose.model("User", userSchema);
