
const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    //type: { type: String, required: true},
    adminID: { type: String, required: true },
    schoolName: { type: String, required: true },
    schoolIcon: { type: String, required: false },
    schoolAddress: { type: String, required: false },
    contactNumber: { type: String, required: false },
    schoolEmail: { type: String, required: false },
    zipCode: { type: Number, required: false },
    aboutSchool: { type: String, required: false },
    schoolType: { type: String, required: false },
    educationLevel: {
        primary: { type: Boolean, required: false },
        middle: { type: Boolean, required: false },
        higher: { type: Boolean, required: false }
    },
    educationType: { type: String, required: false },
    schoolFB: { type: String, required: false },
    schoolCoordinates: {
        longitude: { type: String, required: true },
        latitude: { type: String, required: true }
    },
    feeStructure: [{
        group: { type: String, required: true },
        admissionFee: { type: Number, required: false },
        tutionFee: { type: Number, required: false },
        examFee: { type: Number, required: false },
        sportsFee: { type: Number, required: false },
        labFee: { type: Number, required: false },
        libraryFee: { type: Number, required: false },
        totalAdmissionFee: { type: Number, required: false },
        monthlyFee: { type: Number, required: false },
        othersFee: { type: Number, required: false },
    }],
    images: [{
        path: { type: String, required: false }
    }],
    videos: { type: String, required: false },
    teachers: [{
        teacherName: { type: String, required: false },
        teacherID: { type: String, required: false },
        teacherEmail: { type: String, required: false },
        teacherProfilePic: { type: String, required: false }
    }]
})

module.exports = mongoose.model('school', schoolSchema)