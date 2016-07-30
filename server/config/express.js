const path = require('path');
const morgan = require('morgan');
const express = require('express');

module.exports = app => {
  app.use(express.static(path.join(__dirname, '../../public')));
  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../../public', 'index.html'))
  });
  app.use(morgan('dev'));
};
