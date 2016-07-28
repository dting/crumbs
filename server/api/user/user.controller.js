const User = require('./user.model');

module.exports = {
  /**
   * Finds a user for provided username and checks if password matches
   *
   * @param username
   * @param password
   * @return {Promise.<boolean>} resolves with username if the password matches or false
   */
  login: ({username, password}) => {
    return User.findOne({ username }).exec()
      .then(userData => userData && userData.password === password ? username : false);
  },

  /**
   * Creates a user for provided username and saves password for user
   *
   * @param username
   * @param password
   * @return {Promise.<boolean|string>} resolves with created user's username or false
   */
  signUp: ({username, password}) => {
    return User.findOne({ username }).exec()
      .then(userData => !userData && User.create({ username, password }))
      .then(createdUser => createdUser ? createdUser.username : false);
  },
};
