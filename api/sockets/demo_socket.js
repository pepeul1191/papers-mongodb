module.exports = (route, app, pushClient, removeClient, broadcast) => {
  app.ws(route, (ws, req) => {
    console.log('Conexión WebSocket establecida?');

    ws.on('message', (message) => {
      console.log('Mensaje recibido:', message);
      ws.send('Mensaje recibido por el servidor xd');
      broadcast(message);
    });
  
    ws.on('close', () => {
      console.log('Conexión cerrada');
      removeClient(ws);
    });
  });
};