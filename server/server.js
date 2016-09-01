const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const logger = require('winston');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const sio = socketIO(server);

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || '0.0.0.0';

require('./config/express')(app);
require('./config/sockets')(sio);

db.connect()
  .then(() => server.listen(PORT, IP))
  .then(() => logger.info(`Server running port on ${PORT}`))
  .catch(logger.error);

