const logger = require('winston');
const controller = require('./user.controller');

module.exports.register = socket => {
  /**
   * Check that username and password in userCredentials matches stored values.
   *
   * Emits Authentication message with username if the password matched or false.
   */
  socket.on('user:login', userCredentials => {
    controller.login(userCredentials)
      .then(isAuth => socket.emit('Authentication', isAuth ? userCredentials.username : false))
      .catch(err => logger.error(`user:login error - ${err}`));
  });
};
