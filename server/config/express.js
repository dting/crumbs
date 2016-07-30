const path = require('path');
const morgan = require('morgan');
const express = require('express');

module.exports = app => {
  app.use(express.static(path.join(__dirname, '../../client')));
  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../../client', 'index.html'))
  });
  app.use(morgan('dev'));
};
