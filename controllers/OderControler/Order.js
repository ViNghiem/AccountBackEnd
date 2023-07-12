
const OrderModel = require('../../model/Order/OderModel')


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
  GetAllOrder: async (req, res) => {
    try {
        console.log("da nhan requed")
      const ListOrder = await OrderModel.find().sort({ orderDate: -1 });
      console.log(ListOrder)
      res.status(200).json({data:ListOrder});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  GetDataWeek: async(req,res)=>{
    try {
      console.log(req)
      var datatest = [];
      const day = req.query.dayselect
      const sevenDaysAgo = new Date();
      const timequery = sevenDaysAgo.setDate(sevenDaysAgo.getDate() - day);
      const DateEnd = fomattime( new Date())
      const DateStart =fomattime(new Date(timequery))
      const ListDate = listDates(DateStart,DateEnd)
      const Datagoc = ListDate.map((e)=>{
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
      console.log(err)
      res.status(500).json(err);
    }
  }









}

module.exports = OrderController;