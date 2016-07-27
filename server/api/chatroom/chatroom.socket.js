const controller = require('./chatroom.controller');

module.exports.register = socket => {
  /**
   * Finds a chat room and emits found chat room back to socket.
   */
  socket.on('updateMessagesState', location => {
    controller.updateMessagesState(location)
      .then(chatRoom => socket.emit('updateMessagesState', chatRoom))
      .catch(err => console.log('updateMessageState error:', err));
  });

  /**
   * Creates a chat room and emits created chat room back to socket.
   */
  socket.on('createChatRoom', location => {
    console.log(location);
    controller.createChatRoom(location)
      .then(createdChatRoom => socket.emit('updateMessagesState', createdChatRoom))
      .catch(err => console.log('createChatRoom error:', err));
  });

  /**
   * Add message to chat room and emits back updated chat room to socket.
   *
   * TODO: This should add message to room then emit the message to chat room users
   */
  socket.on('addMessageToChatRoom', msg => {
    controller.addMessageToChatRoom(msg, socket)
      .then(updatedChatRoom => socket.emit('updateMessagesState', updatedChatRoom))
      .catch(err => console.log('addMessageToChatRoom error:', err));
  });
};
