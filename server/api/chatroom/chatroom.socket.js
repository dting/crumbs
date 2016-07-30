const controller = require('./chatroom.controller');

module.exports.register = (socket, io) => {
  /**
   * Joins a chat room and emits location and joined chat room back to socket.
   *
   * Emits an object with location <string> and room <ChatRoom>
   */
  socket.on('join:room', ({ location, username }) => {
    if (location) {
      Object.keys(socket.rooms)
        .forEach(roomId => socket.leave(socket.rooms[roomId]));

      socket.join(location);
      io.to(location).emit('user:joined', username);
      controller.getRoom(location)
        .then(room => socket.emit('room:joined', { location, room }))
        .catch(err => console.log('join:room error:', err));
    }
  });

  /**
   * Checks if chat room exists and emits result back to socket.
   *
   * Emits an object with location <string> and exists <boolean>
   */
  socket.on('check:room', location => {
    if (location) {
      controller.checkRoom(location)
        .then(exists => socket.emit('room:checked', { location, exists }))
        .catch(err => console.log('check:room error:', err));
    }
  });

  /**
   * Creates a chat room and emits if chat room was created back to socket.
   *
   * Emits an object with location <string> and room <boolean>
   */
  socket.on('create:room', location => {
    if (location) {
      controller.createRoom(location)
        .then(room => ({ location, room: !!room }))
        .then(result => socket.emit('room:created', result))
        .catch(err => console.log('create:room error:', err));
    }
  });

  /**
   * Add message to chat room and emits to the room the message that was added.
   *
   * Emits an object with location <string> and message <ChatRoom.Message>
   */
  socket.on('add:message', msg => {
    controller.addMessage(msg)
      .then(created => ({ location: msg.location, message: created }))
      .then(result => io.to(msg.location).emit('message:added', result))
      .catch(err => console.log('add:message error:', err));
  });
};
