const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const config = require('./environment');

module.exports = app => {
  app.set('env', config.env);
  app.set('port', config.port);
  app.set('ip', config.ip);

  app.use(cors());
  app.use(compression());
  app.use(express.static(path.join(__dirname, '../../public')));
  app.use(morgan('dev'));
  app.use(bodyParser.json());
};
