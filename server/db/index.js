const mongoose = require('mongoose');
const config = require('../config/environment');

mongoose.Promise = require('bluebird');

module.exports = {
  connect: () => mongoose.connect(config.mongo.uri),
  connection: mongoose.connection,
};
