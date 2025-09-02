const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors'); // Adicione esta linha
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Libera o CORS para o Socket.IO também
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  setInterval(() => {
    const telemetryData = {
      temperatura: ((-40) + Math.random() * 80).toFixed(2), // Random temperature between 20 and 35
      velocidade: (0 + Math.random() * 10).toFixed(0)    // Random speed between 0 and 100
    };
    socket.emit('telemetry', telemetryData);
    socket.emit('temperatura', telemetryData.temperatura);
    socket.emit('velocidade', telemetryData.velocidade);
  }, 2000); // Send telemetry data every 2 seconds
});


server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});