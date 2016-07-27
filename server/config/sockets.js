const chatRoomSocket = require('../api/chatroom/chatroom.socket');
const userSocket = require('../api/user/user.socket');

module.exports = sio => {
  sio.on('connection', socket => {
    chatRoomSocket.register(socket);
    userSocket.register(socket);
  });
};
