
const mongoose = require('mongoose');

const teacherRequestSchema = new mongoose.Schema({
    teacherID: {type: String, required:true},
    teacherName: {type: String, required: true},
    schoolID: {type: String, required: true},
    status: {type: String, required: true},
    teacherProfilePic: {type: String, required: true}
});

module.exports = mongoose.model('teacherRequest', teacherRequestSchema);