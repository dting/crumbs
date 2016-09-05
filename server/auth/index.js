const express = require('express');
const local = require('./local');

const routes = express.Router();

routes.use('/local', local);

module.exports = routes;
