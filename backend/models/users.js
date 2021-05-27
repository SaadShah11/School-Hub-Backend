
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    type: {type: String, required:true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    password: {type: String, required: true},
    profilePic: {type: String, required: true},
    following: [{
        userID: { type: String, required: true },
        follow: { type: Boolean, required: true }
    }],
    notification: [{
        notificationType: { type: String, required: false },
        userID: { type: String, required: false },
        text: { type: String, required: false }
    }],
    deviceToken: {type: String, required: false},
});

module.exports = mongoose.model('Users', usersSchema);