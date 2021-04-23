
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    username: { type: String, required: true },
    groupImg: { type: String, required: false },
    groupName: { type: String, required: true },
    description: { type: String, required: false },
    time: { type: String, required: false },
    invites: [{
        type: { type: String, required: true},
        username: { type: String, required: true },
        userID: { type: String, required: true },
        request: { type:String, required: true }
    }],
    members: [{
        type: { type: String, required: true},
        username: { type: String, required: true },
        userID: { type: String, required: true }
    }],
    posts: [{
        postID: { type: String, required: true }
    }]
})

module.exports = mongoose.model('group', groupSchema)