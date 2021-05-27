
const mongoose = require('mongoose');

const School = require('../models/school');
const Users = require('../models/users');
const HttpError = require('../models/http-error');
const { json } = require('body-parser');

const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/okay-945dc.appspot.com/o/schoolImages%2FdefaultSchoolIcon.jpeg?alt=media&token=1bad9aff-5d0b-4513-88ca-039d9c6ee180'

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/school?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createSchool = async (req, res, next) => {
    // console.log("Request")
    // console.log(req)
    const createdSchool = new School({
        adminID: req.body.adminID,
        schoolName: req.body.schoolName,
        schoolIcon: req.body.schoolIcon,
        schoolAddress: req.body.schoolAddress,
        contactNumber: req.body.contactNumber,
        schoolEmail: req.body.schoolEmail,
        zipCode: req.body.zipCode,
        aboutSchool: req.body.aboutSchool,
        schoolType: req.body.schoolType,
        educationLevel: req.body.educationLevel,
        educationType: req.body.educationType,
        schoolFB: req.body.schoolFB,
        schoolCoordinates: req.body.schoolCoordinates,
        feeStructure: req.body.feeStructure,
        images: req.body.images,
        videos: req.body.videos,
        teachers: []
    })

    const createdSchoolDefaultIcon = new School({
        adminID: req.body.adminID,
        schoolName: req.body.schoolName,
        schoolIcon: defaultPic,
        schoolAddress: req.body.schoolAddress,
        contactNumber: req.body.contactNumber,
        schoolEmail: req.body.schoolEmail,
        zipCode: req.body.zipCode,
        aboutSchool: req.body.aboutSchool,
        schoolType: req.body.schoolType,
        educationLevel: req.body.educationLevel,
        educationType: req.body.educationType,
        schoolFB: req.body.schoolFB,
        schoolCoordinates: req.body.schoolCoordinates,
        feeStructure: req.body.feeStructure,
        images: req.body.images,
        videos: req.body.videos,
        teachers: []
    })

    try {
        if (createdSchool.schoolIcon != null && createdSchool.schoolIcon != undefined && createdSchool.schoolIcon != '') {
            await createdSchool.save();
        } else {
            console.log("Images")
            console.log(createdSchool.images)
            await createdSchoolDefaultIcon.save();
        }
        //res.status(200).send()
    } catch (err) {
        const error = new HttpError(
            'creating school failed, please try again later.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(201).json({ school: createdSchool.toObject({ getters: true }), schoolID: createdSchool._id });
    //const result = await createdPost.save();
    //res.json(result)
};

const getSchool = async (req, res, next) => {
    const school = await School.find().exec(); //Converting this into a promise using .exec()
    res.status(200).send(JSON.stringify(school))
    //res.json(post);
}


const editSchool = async (req, res, next) => {

    let newName = req.body.schoolName;
    let newDecription = req.body.aboutSchool;
    let newAdderss = req.body.schoolAddress;
    let newContactNumber = req.body.contactNumber;
    let newIcon = req.body.schoolIcon;
    let newZipCode = req.body.zipCode;
    let schoolEmail = req.body.schoolEmail;
    let newschoolType = req.body.schoolType;
    let neweducationType = req.body.educationType;
    let neweducationLevel = req.body.educationLevel;
    let newSchoolCoordinates = req.body.schoolCoordinates

    const schoolId = req.params.sid;

    let school;
    try {
        school = await School.findById(schoolId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update school.',
            500
        );
        return next(error);
    }

    //let allImages = school.images;

    school.schoolName = newName;
    school.aboutSchool = newDecription;
    school.schoolAddress = newAdderss;
    school.contactNumber = newContactNumber;
    school.zipCode = newZipCode;
    school.schoolEmail = schoolEmail
    school.schoolIcon = newIcon
    school.schoolType = newschoolType
    school.educationType = neweducationType

    if (neweducationLevel != undefined) {
        school.educationLevel = neweducationLevel
    }

    if (newSchoolCoordinates != undefined) {
        school.schoolCoordinates = newSchoolCoordinates
    }


    try {
        await school.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update School.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(school);

}

const addNewSchoolImages = async (req, res, next) => {

    let newImages = req.body.images;
    let newVideos = req.body.videos;

    const schoolId = req.params.sid;

    let school;
    try {
        school = await School.findById(schoolId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find school.',
            500
        );
        return next(error);
    }

    let allImages = school.images;

    if (newImages != null || newImages != undefined) {
        school.images.push(newImages)
    }

    if (newVideos != null || newVideos != undefined) {
        school.vidoes = newVideos
    }

    try {
        await school.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update School.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(school);

}

const deleteImage = async (req, res, next) => {

    let imageID = req.body.imageID;

    const schoolId = req.params.sid;

    let school;
    try {
        school = await School.findById(schoolId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find school.',
            500
        );
        return next(error);
    }

    let filteredArray = school.images.filter(function (value) {
        return value._id != imageID;
    });

    school.images = filteredArray;

    try {
        await school.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update School.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(school);

}

const deleteSchool = async (req, res, next) => {

    const schoolID = req.params.sid;
    const adminID = req.body.adminID

    let school;
    try {
        school = await School.deleteOne({ _id: schoolID });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete School.',
            500
        );
        return next(error);
    }

    let user;
    try {
        user = await Users.deleteOne({ _id: adminID });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete School Admin.',
            500
        );
        return next(error);
    }

    res.status(200).json(school);
}

const deleteTeacher = async (req, res, next) => {

    const schoolID = req.params.sid;
    console.log(schoolID)
    const teacherID = req.body.teacherID
    console.log(teacherID)

    let school;
    try {
        school = await School.findOne({ _id: schoolID });
        console.log(school)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find School.',
            500
        );
        return next(error);
    }

    let filteredArray = school.teachers.filter(function (value) {
        return value.teacherID != teacherID;
    });

    school.teachers = filteredArray;

    try {
        await school.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete teacher.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(school);
}


exports.createSchool = createSchool;
exports.getSchool = getSchool;
exports.editSchool = editSchool;
exports.deleteSchool = deleteSchool;
exports.deleteTeacher = deleteTeacher;
exports.addNewSchoolImages = addNewSchoolImages;
exports.deleteImage = deleteImage;
