var socketIO = require('socket.io');

var io = socketIO({
  path: '/demo',
});

io.on('connection', (socket) => {
  console.log('A user connected to demo socket');

  socket.on('disconnect', function () {
    console.log('A user disconnected from demo socket');
 });
});

module.exports = io;