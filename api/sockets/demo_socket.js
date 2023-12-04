module.exports = (ws, req, res, next) => {
  console.log('Conexión WebSocket establecida');
  ws.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    wss.on('connection', (ws) => {
      console.log('Conexión WebSocket establecida');
    
      ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        ws.send('Mensaje recibido por el servidor');
      });
    
      ws.on('close', () => {
        console.log('Conexión cerrada');
      });
    });
  });
};