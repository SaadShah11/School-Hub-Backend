
const mongoose = require('mongoose');

const teacherRequestSchema = new mongoose.Schema({
    teacherID: {type: String, required:true},
    teacherName: {type: String, required: true},
    teacherEmail: {type: String, required: false},
    schoolID: {type: String, required: true},
    adminID: {type: String, required: true},
    status: {type: String, required: false},
    teacherProfilePic: {type: String, required: true},
    teacherDepartment: {type: String, required: true},
    teacherCourse: {type: String, required: true}
});

module.exports = mongoose.model('teacherRequest', teacherRequestSchema);