
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    username: { type: String, required: true },
    userProfilePic: { type: String, required: false },
    date: { type: String, required: false },
    reviewText: { type: String, required: true },
    rating: { type: Number, required:true },
    reply: [{
        schoolIcon: { type: String, required: false },
        text: { type: String, required: true }}]
})

module.exports = mongoose.model('schoolhubReview', reviewSchema)