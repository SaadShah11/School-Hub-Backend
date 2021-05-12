
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    schoolID: { type: String, required: true },
    userID: { type: String, required: true },
    username: { type: String, required: true },
    userProfilePic: { type: String, required: false },
    date: { type: String, required: false },
    reviewText: { type: String, required: true },
    rating: { type: Number, required:true },
    reply: [{
        username: { type: String, required: true },
        userID: { type: String, required: true },
        text: { type: String, required: false },
        profilePic: { type: String, required: false }
    }]
})

module.exports = mongoose.model('review', reviewSchema)