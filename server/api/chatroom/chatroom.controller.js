const ChatRoom = require('./chatroom.model');

module.exports = {
  /**
   * Finds a chat room for a location.
   *
   * @param location {string} lat.toFixed(3)+long.toFixed(3)
   * @return {Promise.<Object>} resolves with found chat room
   */
  getRoom: location => ChatRoom.findOne({ location }).exec(),

  /**
   * Check if a chat room exists for a location.
   *
   * @param location {string} lat.toFixed(3)+long.toFixed(3)
   * @return {Promise.<boolean>} resolves with if a room exists
   */
  checkRoom: location => module.exports.getRoom(location)
    .then(room => !!room),

  /**
   * Creates a chat room.
   *
   * @param location {string} lat.toFixed(3)+long.toFixed(3)
   * @return {Promise.<Object>} resolves with created chat room
   */
  createRoom: location => module.exports.checkRoom(location)
    .then(exists => {
      if (exists) {
        return false;
      }
      return ChatRoom.create({ location });
    }),

  /**
   * Adds a message to a chat room.
   *
   * @param location {string} lat.toFixed(3)+long.toFixed(3)
   * @param message {string} text of message
   * @param username {string} name of message sender
   * @return {Promise.<Object>} resolves with updated chat room
   */
  addMessage: ({ location, message, username }) => ChatRoom.findOne({ location }).exec()
    .then(room => {
      const msg = room.messages.create({ message, username });
      room.messages.push(msg);
      return room.save().then(() => msg);
    }),
};
