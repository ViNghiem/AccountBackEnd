const WarehauseAddress = require('../../model/Order/WarehauseAddress')
const axios =require('axios')

async function GetNameAdress(id,url) {
  const da = await axios.get(url)
        .then( async response => {
        
        const listData = response.data.data
        const obj = await listData.find(item => item.id === id);
        return obj
        })
        .catch(error => {console.error(error);
  });
  return da

}



const Shipping = {
  AddWarehauseAddress: async (req, res) => {
    try {
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



  UpdateAddWarehauseAddress: async (req,res)=>{
    try {
      console.log(req.body,"params")
      const address = await WarehauseAddress.findOne()
      console.log("address",address)
      const filter = { _id: address.id};
      const update = { $set: { 
                            idProvince:req.body.newaddress.idProvince,
                            idDistrict: req.body.newaddress.idDistrict,
                            idCommune:req.body.newaddress.idCommune,
                            listIdDistrict: req.body.newaddress.listIdDistrict
                        }
                     };
      const result = await WarehauseAddress.updateOne(filter, update);
      const newAddress = await WarehauseAddress.findOne(filter)
      res.status(200).json(newAddress)
    } catch (err) {
      console.log("error",err)
      res.status(500).json(err);
    }
  },

  tesst: async (req, res) => {
    try {
     console.log("jksahdjkashjkdhasjkhdjk")
    } catch (err) {
      res.status(500).json(err);
    }
  },




  getAddWarehauseAddress: async (req, res) => {
    try{
      const address = await WarehauseAddress.findOne()
      const idProvince = address.idProvince
      const nameProvince =await GetNameAdress(idProvince,`https://pos.pages.fm/api/v1/geo/provinces`)
      const idDistrict = address.idDistrict
      const nameDistrict =await GetNameAdress(idDistrict,`https://pos.pages.fm/api/v1/geo/districts?province_id=${idProvince}`)
      const listIdDistrict = address.listIdDistrict
      const idCommune = address.idCommune
      const nameCommune = await GetNameAdress(idCommune,`https://pos.pages.fm/api/v1/geo/communes?district_id=${idDistrict}`)
     const obj =  await Promise.all(
        listIdDistrict.map( async e =>{
          console.log("eeeee",e)
          const name = await GetNameAdress(e,`https://pos.pages.fm/api/v1/geo/districts?province_id=${idProvince}`)
          return name
        })
      )
     const data = {
      Province:nameProvince,
      District:nameDistrict,
      Commune:nameCommune,
      listUban:obj,
      shippngUban:address.Uban,
      ShippingSububan:address.Sububan
     }
     res.status(200).json(data);

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },





  setShipping :async (req, res) => {
    try {
     console.log("jksahdjkashjkdhasjkhdjk")
    } catch (err) {
      res.status(500).json(err);
    }
  },


  getShipping :async (req, res) => {
    try {
      const Warehouse =  await WarehauseAddress.findOne()
      const idProvince = req.query.idProvince
      const idDistrict = req.query.idDistrict
      const idCommune = req.query.idCommune
      if(idProvince === Warehouse.idProvince){
        let checkidDistrict = Warehouse.listIdDistrict.filter(e =>{
          return e === idDistrict
        })
          if(checkidDistrict.length > 0){
            res.status(200).json({shippingFee:Warehouse.Uban});
          }else{
            res.status(200).json({shippingFee:Warehouse.Sububan});
          }
      }else{
        res.status(200).json({shippingFee:Warehouse.Sububan});
      }
   
    } catch (err) {
      res.status(500).json(err);
    }
  },





}

module.exports = Shipping;