const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  username: String,
}, {
  timestamps: true,
});

const chatRoomSchema = new Schema({
  location: String,
  messages: [messageSchema],
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
