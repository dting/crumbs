var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Create a new key on the module.exports so server.js can access the connection property from db.
module.exports.connect = function() {
  mongoose.connect('mongodb://mdubie:ttaM3199@ds027165.mlab.com:27165/crumbs', function(err) {
    err ? console.log(err) : console.log('db connected');
  });
};
