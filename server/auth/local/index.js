const express = require('express');
const { sendJWTToken } = require('../auth.service');
const controller = require('./local.controller');

const routes = express.Router();

routes.post('/', controller.auth, sendJWTToken);

module.exports = routes;
