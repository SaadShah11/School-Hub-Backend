
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    //type: { type: String, required: true},
    userID: { type: String, required: true },
    username: { type: String, required: true },
    userProfilePic: { type: String, required: false },
    text: { type: String, required: false },
    image: { type: String, required: false },
    likes: [{
        username: { type: String, required: true },
        userID: { type: String, required: true },
        like: { type: Boolean, required: true }
    }],
    totalLikes: { type: Number, required: true},
    time: { type: String, required: false },
    comments: [{
        username: { type: String, required: true },
        userID: { type: String, required: true },
        text: { type: String, required: false }
    }]
})

module.exports = mongoose.model('post', postSchema)