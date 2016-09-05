const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const express = require('express');

module.exports = app => {
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../../public')));
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
  });
  app.use(morgan('dev'));
};
