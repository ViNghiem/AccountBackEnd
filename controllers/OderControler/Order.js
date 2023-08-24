
const OrderModel = require('../../model/Order/OderModel')
const ItemOrder = require('../../model/Order/ItemOrder')
const axios =require('axios')




async function GetNameAdress(id,url) {
  const da = await axios.get(url)
              .then( async response => {
              // console.log('response',response)
              const listData = response.data.data
              const obj = await listData.find(item => item.id === id);
              return obj
              })
              .catch(error => {console.error(error);
        });
        return da

}




function fomattime(time){
  var day = time.getDate(); 
  var month = time.getMonth() + 1; 
  var year = time.getFullYear();
  return year+`-`+month+`-`+day
}
function listDates(startDate, endDate) {
  var start = new Date(startDate);
  var end = new Date(endDate);
  var dates = [];
  var current = start;
  while (current <= end) {
    dates.push(fomattimeVN(new Date(current)));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function fomattimeVN(time){
  var day = time.getDate(); 
  var month = time.getMonth() + 1; 
  var year = time.getFullYear();
  return day +'/'+ month+`/` +year
}




const OrderController = {


  UpdateOrder: async(req,res)=>{
    try {
    const id =req.body.id
    const status = req.body.state
      await OrderModel.findOneAndUpdate({_id:id}, {$set: { status:status,UpdateStatus:req.user.id}},  { upsert: true })
      const OrderUpdate = await OrderModel.findOne({_id:id})
      res.status(200).json({order:OrderUpdate});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  GetAllOrder: async (req, res) => {
    try {
      if(req.user.isAdmin){
        const ListOrder = await OrderModel.find().sort({ orderDate: -1 });
        res.status(200).json({data:ListOrder});
      }else{
        const ListOrder = await OrderModel.find({StaffHandlingLsy:req.user.id}).sort({ orderDate: -1 });
        res.status(200).json({data:ListOrder});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  GetOrder: async(req,res)=>{
    try {

 

      const idorder = req.query.id
      const order = await OrderModel.findOne({_id:idorder})
      const province_id = order.province_id
      const district_id = order.district_id
      const communes_id = order.commune_id

      const Provin = await GetNameAdress(province_id,`https://pos.pages.fm/api/v1/geo/provinces`)
      const Distris = await GetNameAdress(district_id,`https://pos.pages.fm/api/v1/geo/districts?province_id=${province_id}`)
      const Communes = await GetNameAdress(communes_id,`https://pos.pages.fm/api/v1/geo/communes?district_id=${district_id}`)
      const fullAdress = order.address+ ' - ' + Communes.name+' - ' + Distris.name +' - '+ Provin.name
     const  {...Order} = order._doc
     Order.fullAdress = fullAdress
    
      // https://pos.pages.fm/api/v1/geo/communes?district_id=22111
      // const dataProvin = await axios.get('https://pos.pages.fm/api/v1/geo/provinces')
      //       .then(response => {
      //        console.log('response',response)
      //        return(response.data).data;
      //       })
      //       .catch(error => {console.error(error);
      // });


      
    // https://pos.pages.fm/api/v1/geo/districts?province_id=207








      // const nameProvin = dataProvin.find(item => item.id === province_id);
      
      // console.log("---------nameProvin---------",{...order})
      // console.log("--------Order----------",Order)
      // console.log("---------Communes---------",order.fullAdress)
      const  itemorder = await ItemOrder.find({idOrder:idorder})
      const data ={orderInfo:Order,items:itemorder}

      if(req.user.isAdmin || req.user.id == order.StaffHandlingLsy ){
        res.status(200).json(data)
      }else{
        res.status(500).json({mess:'loi'})
      }
    } catch (error) {
      res.status(500).json({mess:'loi'})
    }
  },

  GetDataWeek: async(req,res)=>{
    try {
      // console.log(req.query)
      const timeEnd= req.query.timeEnd
      var datatest = [];
      const day = req.query.dayselect
      const dateParts = timeEnd.split('/')
      
      const sevenDaysAgo = new Date();
      const DateEnd = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      // console.log("--DateEnd---",new Date(DateEnd).getDate())

      // console.log("--sevenDaysAgo---",sevenDaysAgo.getDate())



      const timequery = sevenDaysAgo.setDate(new Date(DateEnd).getDate() - day);
      // console.log("timequery",new Date(dateParts[2], dateParts[1], dateParts[0]))
      
    
      const DateStart = fomattime(new Date(timequery))
      const ListDate = await listDates(DateStart,DateEnd)
      // console.log("--ListDate--",ListDate)
      const Datagoc =await ListDate.map((e)=>{
        return(
          {
            name:e,
            total:0,
            pending:0,
            delivered:0
          }
        )
      })
      const data = await OrderModel.find({ orderDate: { $gte: timequery } })
      var groupedObjects = {};
       for (var i = 0; i < data.length; i++) {
         var obj = data[i];
         var time =  fomattimeVN(new Date( obj.orderDate));
         if (groupedObjects[time]) {
           groupedObjects[time].push(obj);
         } else {
           groupedObjects[time] = [obj];
         }
       }
      for (var key in groupedObjects) {
        if (groupedObjects.hasOwnProperty(key)) {
          const value = groupedObjects[key]
          var totalPending = 0
          var totalDelivered = 0
          for(let i=0;i<value.length;i++){
            if(value[i].status ==='pending'){
              totalPending = totalPending + 1
            }
            if(value[i].status==='delivered'){
              totalDelivered = totalDelivered + 1
            }
          }
          const datachar ={
            name:key,
            total:value.length,
            pending:totalPending,
            delivered:totalDelivered
          }
          datatest.push(datachar)
        }
      }
      for (var i = 0; i < Datagoc.length; i++) {
        var item1 = Datagoc[i];
        var item2 = datatest.find(function(item) {
          return item.name === item1.name;
        });  
        if (item2){
          Datagoc[i] = item2;
        }
      }
      res.status(200).json({data:Datagoc});
    } catch (err) {
      // console.log(err)
      res.status(500).json(err);
    }
  }

}

module.exports = OrderController;