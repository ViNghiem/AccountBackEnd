const WarehauseAddress = require('../../model/Order/WarehauseAddress')


const Shipping = {
  AddWarehauseAddress: async (req, res) => {
    try {
      console.log(req.body)
      const address = await WarehauseAddress.find()
      const newAdd = {
        idProvince:req.body.idProvince,
        idDistrict:req.body.idDistrict,
        idCommune:req.body.idCommune,
        listIdDistrict:req.body.listIdDistrict
      }

      if(address.length > 0){
        res.status(200).json('oke');
      }else{
        const newHauseAddress = await new WarehauseAddress(newAdd)
        const data = newHauseAddress.save()
        res.status(200).json(data);
      }

     
     
      
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  tesst: async (req, res) => {
    try {
     console.log("jksahdjkashjkdhasjkhdjk")
     
      
    } catch (err) {
      res.status(500).json(err);
    }
  }



}

module.exports = Shipping;