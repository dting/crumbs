const express = require('express');
const user = require('./user');

const routes = express.Router();

routes.use('/users', user);

module.exports = routes;
