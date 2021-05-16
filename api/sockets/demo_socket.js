var socketIO = require('socket.io');
const socketDemoMiddleware = require('../middlewares/demo');

var io = socketIO({
  path: '/demo',
});

io.use(function(socket, next) {
  socketDemoMiddleware(socket.request, socket.request.res, next);
});

io.on('connection', (socket) => {
  console.log('A user connected to demo socket');

  socket.on('disconnect', function () {
    console.log('A user disconnected from demo socket');
 });
});

module.exports = io;