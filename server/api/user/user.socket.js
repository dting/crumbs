const controller = require('./user.controller');

module.exports.register = socket => {
  /**
   * Check that username and password in userCredentials matches stored values.
   *
   * Emits Authentication message with boolean value of if the password matched.
   */
  socket.on('validateUserLogin', userCredentials => {
    controller.login(userCredentials)
      .then(isAuthenticated => socket.emit('Authentication', isAuthenticated))
      .catch(err => console.log('validateUserLogin', err));
  });

  /**
   * Attempts to create a user with username and password from userCredentials.
   *
   * Emits Authentication message with username if user is created successfully,
   * or false if user with username already exists.
   */
  socket.on('validateUserSignup', userCredentials => {
    controller.signUp(userCredentials)
      .then(username => socket.emit('Authentication', username))
      .catch(err => console.log('validateUserSignup', err));
  });
};
