
const WebSocket = require('ws');
const OrderModel = require('../model/Order/OderModel')
const jwt = require("jsonwebtoken");

var clients = [];

const verifyTokenSocket = (token) => {
  jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) { 
      // console.log(err)  
      return false
    }else{
     return true
    }

  })

}





const socketServer = (server)=> {
  const wss = new WebSocket.Server({ server });
  const supportedSubprotocols = ['token'];
 
  const connections = new Map()
  wss.on('connection', (ws,req) => {
    OrderModel.watch().on('change', (change) => {
      console.log("--------------------change-------------------------",change)

      if(change.operationType =="insert"){
        const data = change.fullDocument.full_name
        ws.send(`${data} mới đặt hàng`);
      }else{
        ws.send(`Có một đơn hàng được thay đổi trạng thái`);
      }
  });


console.log("req-------------------",req.headers )
    
  
    ws.on('message', (message) => {
          console.log('Received message:', message.toString('utf-8'));
          const userId = 'user123'; 
          connections.set(userId, ws)
          // ws.send('Welcome to the WebSocket server!');
    });


    ws.on('close', () => {
      console.log('User disconnected');
    });
    
    
  });


 
  

};






module.exports = socketServer