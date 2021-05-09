
const mongoose = require('mongoose');

const videoStreamingSchema = new mongoose.Schema({
    schoolID: { type: String, required: true },
    schoolName: { type: String, required: true },
    schoolIcon: { type: String, required: false },
    title: { type: String, required: true },
    privacy: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    currentTime: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required:true },
    resourceURI: { type: String, required:false },
    isLive: { type: Boolean, required:false }
})

module.exports = mongoose.model('videoStreaming', videoStreamingSchema)