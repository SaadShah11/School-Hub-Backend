
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notificationType: { type: String, required: true },
    text: { type: String, required: true },
    displayTo: { type: String, required: false },
    sendTo: [{
        username: { type: String, required: true },
        userID: { type: String, required: true }
    }],
    seen: [{
        username: { type: String, required: true },
        userID: { type: String, required: true }
    }]
})

module.exports = mongoose.model('notifications', notificationSchema)