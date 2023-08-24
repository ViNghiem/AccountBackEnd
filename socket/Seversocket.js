const WebSocket = require('ws');
const socketServer = (server)=> {
  const wss = new WebSocket.Server({ server });
const connections = new Map()
  wss.on('connection', (ws) => {
    console.log('A user connected');

    ws.on('message', (message) => {
      console.log('Client connected');
          console.log('Received message:', message.toString('utf-8'));
          const userId = 'user123'; 
          connections.set(userId, ws)
          ws.send('Welcome to the WebSocket server!');
    });

    ws.on('close', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = socketServer