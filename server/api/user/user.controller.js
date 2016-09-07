const u = require('../../utils');
const { signToken } = require('../../auth/auth.service');
const User = require('./user.model');

module.exports = {
  /**
   * Creates a user for provided username and saves password for user
   *
   * If user with username exists, resolves promise with false.
   *
   * @param req
   * @param res
   */
  signUp: function create(req, res) {
    const { username, password } = req.body;
    User.create({ username, password })
      .then(user => signToken(user._id))
      .then(token => ({ token }))
      .then(u.respondWithResult(res))
      .catch(u.validationError(res, 422));
  },

  /**
   * Finds the req.user and returns the user without the password field
   *
   * @param req
   * @param res
   */
  me: function me(req, res) {
    User.findById(req.user._id, '-password')
      .then(u.respondWithResult(res))
      .catch(u.handleError(res));
  },
};
