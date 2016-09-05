const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const logger = require('winston');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const sio = socketIO(server);

require('./config/express')(app);
require('./config/routes')(app);
require('./config/sockets')(sio);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

db.connect()
  .then(() => logger.info('Mongoose connection established...'))
  .then(() => server.listen(app.get('port'), app.get('ip')))
  .then(() => logger.info(`Listening on port ${app.get('port')} in ${app.get('env')} mode...`))
  .catch(logger.error);

