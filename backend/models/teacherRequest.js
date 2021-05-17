
const mongoose = require('mongoose');

const teacherRequestSchema = new mongoose.Schema({
    teacherID: {type: String, required:true},
    teacherName: {type: String, required: false},
    teacherEmail: {type: String, required: false},
    schoolID: {type: String, required: true},
    adminID: {type: String, required: false},
    status: {type: String, required: false},
    teacherProfilePic: {type: String, required: false}
});

module.exports = mongoose.model('teacherRequest', teacherRequestSchema);