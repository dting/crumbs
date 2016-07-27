const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports.connect = () => {
  return mongoose.connect('mongodb://localhost/crumbs')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.log('Error connecting to mongodb:', db));
};
