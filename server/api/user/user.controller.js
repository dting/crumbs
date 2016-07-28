const User = require('./user.model');

module.exports = {
  /**
   * Finds a user for provided username and checks if password matches
   *
   * @param username
   * @param password
   * @return {Promise.<boolean>} resolves with if the password matches
   */
  login: ({ username, password }) => User.findOne({ username }).exec()
    .then(userData => userData && userData.password === password),

  /**
   * Creates a user for provided username and saves password for user
   *
   * If user with username exists, resolves promise with false.
   *
   * @param username
   * @param password
   * @return {Promise.<boolean>} resolves with if the user was created
   */
  signUp: ({ username, password }) => User.findOne({ username }).exec()
    .then(foundUser => !foundUser && User.create({ username, password })),
};
