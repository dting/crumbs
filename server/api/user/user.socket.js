const controller = require('./user.controller');

module.exports.register = socket => {
  socket.on('validateUserLogin', userCredentials => controller.validateUserLogin(userCredentials, socket));
  socket.on('validateUserSignup', userCredentials => controller.validateUserSignup(userCredentials, socket));
};
