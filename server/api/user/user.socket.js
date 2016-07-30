const controller = require('./user.controller');

module.exports.register = socket => {
  /**
   * Check that username and password in userCredentials matches stored values.
   *
   * Emits Authentication message with username if the password matched or false.
   */
  socket.on('validateUserLogin', userCredentials => {
    controller.login(userCredentials)
      .then(isAuth => socket.emit('Authentication', isAuth ? userCredentials.username : false))
      .catch(err => console.log('validateUserLogin', err));
  });

  /**
   * Attempts to create a user with username and password from userCredentials.
   *
   * Emits Authentication message with username if user is created successfully,
   * or false if user with username already exists.
   */
  socket.on('validateUserSignUp', userCredentials => {
    controller.signUp(userCredentials)
      .then(created => socket.emit('Authentication', created ? userCredentials.username : false))
      .catch(err => console.log('validateUserSignup', err));
  });
};
