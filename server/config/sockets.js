const socketioJwt = require('socketio-jwt');
const chatRoomSocket = require('../api/chatroom/chatroom.socket');
const User = require('../api/user/user.model');
const config = require('./environment');

module.exports = sio => {
  sio.use(socketioJwt.authorize({
    secret: config.secrets.session,
    handshake: true,
  }));

  sio.use((socket, next) => {
    const userId = socket.decoded_token._id;
    User.findById(userId, '-password')
      .then(user => {
        if (!user) {
          return next(new Error('Invalid token.'));
        }
        socket.user = user; // eslint-disable-line no-param-reassign
        return next();
      })
      .catch(() => next(new Error('Authentication Error')));
  });

  sio.on('connection', socket => {
    chatRoomSocket.register(socket, sio);
  });
};
