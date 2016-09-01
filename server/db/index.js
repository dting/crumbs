const mongoose = require('mongoose');
const logger = require('winston');

mongoose.Promise = require('bluebird');

module.exports.connect = function connect() {
  return mongoose.connect('mongodb://localhost/crumbs')
    .then(() => logger.info('Connected to MongoDB'))
    .catch(err => {
      throw new Error(`MongoDB connection error - ${err}`);
    });
};

