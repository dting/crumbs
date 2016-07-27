const controller = require('./chatroom.controller');

module.exports.register = socket => {
  socket.on('updateMessagesState', location => controller.updateMessagesState(location, socket));
  socket.on('createChatRoom', location => controller.createChatRoom(location, socket));
  socket.on('addMessageToChatRoom', msg => controller.addMessageToChatRoom(msg, socket));
};
