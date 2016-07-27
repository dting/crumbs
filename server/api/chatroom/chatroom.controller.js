const Chatroom = require('./chatroom.model');

module.exports = {
  // takes in array of lat and long and will query database to see if a token exists in that location
  //if it exists will return an array of messages from db, if not, will return null
  updateMessagesState: (location, socket) => {
    Chatroom.findOne({ location }, (err, tokenData) => {
      socket.emit('updateMessagesState', tokenData);
    });
  },

  // takes in array of lat and long and will write a key (lat long array) value (empty array for messages) to db
  createChatRoom: (location, socket) => {
    Chatroom.create({
      location,
      messages: [],
    }).then((data) => {
      socket.emit('updateMessagesState', data);
    }).catch((err) => {
      console.log('createToken data failed to save to database', err);
    });
  },

  addMessageToChatRoom: ({ location, message, username }, socket) => {
    Chatroom.findOne({ location }, (err, tokenData) => {
      const tokenDataReturn = tokenData;
      const newMessages = tokenData.messages;
      newMessages.unshift({ message, username });
      tokenDataReturn.messages = newMessages;
      Chatroom.update({ location }, { messages: newMessages }, (err, dbResponse) => {
        socket.emit('updateMessagesState', tokenDataReturn);
      });
    });
  },
};

