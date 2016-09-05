const express = require('express');
const { isAuthenticated } = require('../../auth/auth.service');
const controller = require('./user.controller');

const users = express.Router();

users.post('/sign-up', controller.signUp);
users.get('/me', isAuthenticated, controller.me);

module.exports = users;
