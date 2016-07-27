const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const sio = socketIO(server);

require('./config/express')(app);
require('./config/sockets')(sio);

const startServer = () => {
  server.listen(3000, err => {
    if (err) {
      console.log('Error starting server:', err);
    }
    console.log('Server running port on 3000');
  });
};

db.connect().then(startServer);

