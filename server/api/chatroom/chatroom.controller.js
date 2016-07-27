const ChatRoom = require('./chatroom.model');

module.exports = {
  /**
   * Finds a chat room.
   *
   * @param location {number[]} lat, long
   * @return {Promise} promise that resolves with found chat room
   */
  updateMessagesState: location => ChatRoom.findOne({ location }).exec(),

  /**
   * Creates a chat room.
   *
   * @param location {number[]} lat, long
   * @return {Promise} promise that resolves with created chat room
   */
  createChatRoom: location => ChatRoom.create({ location }),

  /**
   * Adds a message to a chat room.
   *
   * @param location {number[]} lat, long
   * @param message {string} text of message
   * @param username {string} name of message sender
   * @return {Promise} promise that resolves with updated chat room
   */
  addMessageToChatRoom: ({ location, message, username }) => {
    return ChatRoom.findOne({ location }).exec()
      .then(room => {
        room.messages.push({ message, username });
        return room.save();
      });
  },
};

