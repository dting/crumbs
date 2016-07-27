const mongoose = require('mongoose');

const chatroomSchema = mongoose.Schema({
  location: String,
  messages: [{message: String, username: String, createdAt: {type: Date, default: Date.now}}],
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
