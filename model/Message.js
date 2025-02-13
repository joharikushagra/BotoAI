const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
    channel: { type: String, required: true },
});

const Message = mongoose.model('botomessages', messageSchema);

module.exports = Message;
