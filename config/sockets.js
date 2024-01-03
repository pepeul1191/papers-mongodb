var demoSocket = require('../api/sockets/demo_socket');

const clients = [];

const broadcast = (message) => {
  console.log(message)
  clients.forEach(client => {
    client.send(message);
  });
}

const pushClient = (ws) => {
  clients.push(ws);
}

const removeClient = (ws) => {
  clients.splice(clients.indexOf(ws), 1);
}

module.exports = (app) => {  
  // sockets
  demoSocket('/ws', app, pushClient, removeClient, broadcast);
}