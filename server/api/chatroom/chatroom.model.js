const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: String, username: String,
}, {
  timestamps: true,
});

const chatRoomSchema = mongoose.Schema({
  location: String,
  messages: [messageSchema],
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
