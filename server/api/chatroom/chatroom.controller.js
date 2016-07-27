const ChatRoom = require('./chatroom.model');

module.exports = {
  /**
   * Finds chat room.
   *
   * @param location {number[]} lat, long
   * @param socket
   */
  updateMessagesState: (location, socket) => {
    ChatRoom.findOne({ location }).exec()
      .then(room => socket.emit('updateMessagesState', room))
      .catch(err => console.log('updateMessagesState error:', err));
  },

  /**
   * Creates a chat room.
   *
   * @param location {number[]} lat, long
   * @param socket
   */
  createChatRoom: (location, socket) => {
    ChatRoom.create({ location })
      .then(room => socket.emit('updateMessagesState', room))
      .catch(err => console.log('createChatRoom error:', err));
  },

  /**
   * Adds a message to a chat room.
   *
   * @param location {number[]} lat, long
   * @param message {string} text of message
   * @param username {string} name of message sender
   * @param socket
   */
  addMessageToChatRoom: ({ location, message, username }, socket) => {
    ChatRoom.findOne({ location }).exec()
      .then(room => {
        room.messages.push({ message, username });
        return room.save();
      })
      .then(room => socket.emit('updateMessagesState', room))
      .catch(err => console.log('addMessageToChatRoom error:', err));
  },
};

