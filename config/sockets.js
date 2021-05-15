var demoSocket = require('../api/sockets/demo_socket');

module.exports = (server) => {
  demoSocket.attach(server);
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