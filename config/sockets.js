var demoSocket = require('../api/sockets/demo_socket');
const WebSocket = require('ws');

module.exports = (wss, clients) => {
  wss.on('connection', (ws) => {
    console.log('Conexión WebSocket establecida');
    clients.add(ws);

    ws.on('message', (message) => {
      console.log(`Mensaje recibido: ${message}`);
      broadcast(message);
    });

    ws.on('close', () => {
      console.log('Conexión cerrada');
      clients.delete(ws);
    });
  });

  const broadcast = (message) => {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log('1 +++++++++++++++++++')
        console.log(message)
        const textMessage = message.toString('utf8');
        console.log(textMessage)
        console.log('2 +++++++++++++++++++')
        client.send(textMessage);
      }
    });
  }
}
/*
var socketIO = require('socket.io');
var io = socketIO({
  path: '/test',
});
var socketApi = {};

socketApi.io = io;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', function () {
    console.log('A user disconnected');
 });
});

socketApi.sendNotification = function() {
  io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socketApi;
*/