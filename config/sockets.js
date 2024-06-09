import demoSocket from '../api/sockets/demo_socket.js';

const clients = [];

const broadcast = (message) => {
  console.log(message);
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

export default (app) => {  
  // sockets
  demoSocket('/ws', app, pushClient, removeClient, broadcast);
}
