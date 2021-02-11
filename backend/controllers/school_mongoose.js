
const mongoose = require('mongoose');

const School = require('../models/school');
const HttpError = require('../models/http-error');
const { json } = require('body-parser');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/school?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createSchool = async (req, res, next) => {
    const createdSchool = new School({
        adminID: req.body.adminID,
        schoolName: req.body.schoolName,
        schoolAddress: req.body.schoolAddress,
        contactNumber: req.body.contactNumber,
        schoolEmail: req.body.schoolEmail,
        zipCode: req.body.zipCode,
        aboutSchool: req.body.aboutSchool,
        schoolType: req.body.schoolType,
        educationLevel: req.body.educationLevel,
        educationType: req.body.educationType,
        schoolCoordinates: req.body.schoolCoordinates,
        feeStructure: req.body.feeStructure,
        images: req.body.images,
        videos: req.body.videos
    })

    try {
        await createdSchool.save();
        //res.status(200).send()
    } catch (err) {
        const error = new HttpError(
            'creating school failed, please try again later.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(201).json({ school: createdSchool.toObject({ getters: true }) });
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
    //let newImages = req.body.images;
    let newZipCode = req.body.zipCode;
    let schoolEmail = req.body.schoolEmail;
    let newImages = req.body.images;
    let newVideos = req.body.videos

    const schoolId = req.params.sid;

    let school;
    try {
        school = await School.findById(schoolId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update place.',
            500
        );
        return next(error);
    }

    let allImages = school.images;

    //console.log(newLikes)
    //console.log('Break')
    //post.comments = allComments.push(newComment)
    //post.comments = newComment;

    school.schoolName = newName;
    school.aboutSchool = newDecription;
    school.schoolAddress = newAdderss;
    school.contactNumber = newContactNumber;
    school.zipCode = newZipCode;
    school.schoolEmail = schoolEmail

    if (newImages != null) {
        school.images.push(newImages)
    }

    if (newVideos != null ) {
        //school.vidoes.push(newVideos)
    }



    //console.log(post.comments)

    try {
        await school.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update post.',
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

/*
Sample Data
{
    "userID": 879,
    "username": "saad",
    "text": null,
    "image":"uploads/images/image.jpeg",
    "likes":20,
    "time": {
        "Date":"12/06/2020",
        "Time":"12:00 PM"
    },
    "comments":{
        "username":"mubeen","text":"hello",
    }
}

*/