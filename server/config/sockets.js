const socketioJwt = require('socketio-jwt');
const chatRoomSocket = require('../api/chatroom/chatroom.socket');
const userSocket = require('../api/user/user.socket');
const config = require('./environment');

module.exports = sio => {
  sio.use(socketioJwt.authorize({
    secret: config.secrets.session,
    handshake: true,
  }));

  sio.on('connection', socket => {
    chatRoomSocket.register(socket, sio);
    userSocket.register(socket);
  });
};
