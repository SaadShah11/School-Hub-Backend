
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    type: { type: String, required: true},
    userID: { type: Number, required: true },
    username: { type: String, required: true },
    text: { type: String, required: false },
    image: { type: String, required: false},
    likes: {type: Number, required:false},
    time: {type:Object, required:true},
    comments: {type:Object, required:false}
})

module.exports = mongoose.model('post', postSchema)