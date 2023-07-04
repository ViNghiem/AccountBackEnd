
const OrderModel = require('../../model/Order/OderModel')







const OrderController = {
  GetAllOrder: async (req, res) => {
    try {
        console.log("da nhan requed")
      const ListOrder = await OrderModel.find();
      console.log(ListOrder)
      res.status(200).json({data:ListOrder});
    } catch (err) {
      console.log("err")
      res.status(500).json(err);
    }
  }



}

module.exports = OrderController;