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

  socket.on('sensorData', (telemetry) => {
    console.log('Dados recebidos do ESP32:', telemetry);

    socket.broadcast.emit('telemetry', telemetry);

  });
});

server.listen(4000, () => {
  console.log('server running at http://192.168.0.117:4000');
});