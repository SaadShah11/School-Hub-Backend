const mongoose = require('mongoose');

const teacherRequest = require('../models/teacherRequest');
const School = require('../models/school');
const HttpError = require('../models/http-error');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/teacherRequests?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createTeacherRequest = async (req, res, next) => {
    const createdTeacherRequest = new teacherRequest({
        teacherID: req.body.teacherID,
        teacherName: req.body.teacherName,
        teacherEmail: req.body.teacherEmail,
        schoolID: req.body.schoolID,
        adminID: req.body.adminID,
        status: "Pending",
        teacherProfilePic: req.body.teacherProfilePic
    })

    try {
        const result = await createdTeacherRequest.save();
        res.status(200).send()
        //res.status(201).json({ stream: createdStream.toObject({ getters: true }) });
        //res.json(result)
    } catch (err) {
        const error = new HttpError(
            'Teacher Request failed, please try again later.',
            500
        );
        console.log(err)
        return next(error);
    }

    //res.status(201).json({ stream: createdStream.toObject({ getters: true }) });
}

const getTeacherRequests = async (req, res, next) => {
    const teacherRequests = await teacherRequest.find().exec(); //Converting this into a promise using .exec()
    res.status(200).send(JSON.stringify(teacherRequests))
}

const updateTeacherRequest = async (req, res, next) => {
    let newStatus = req.body.status;
    let schoolID = req.body.schoolID
    console.log(newStatus)
    console.log(schoolID)

    const teacherRequestID = req.params.tid;
    console.log(teacherRequestID)

    let tteacherRequest;
    try {
        tteacherRequest = await teacherRequest.findById(teacherRequestID);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find teacher.',
            500
        );
        return next(error);
    }

    let school;
    try {
        school = await School.findById(schoolID);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find School.',
            500
        );
        return next(error);
    }

    let teacherObj = {
        teacherID: tteacherRequest.teacherID,
        teacherName: tteacherRequest.teacherName,
        teacherProfilePic: tteacherRequest.teacherProfilePic
    }

    tteacherRequest.status = newStatus

    if(newStatus === "Accepted"){
        console.log("Teacher Object")
        console.log(teacherObj)
        school.teachers.push(teacherObj)

        try {
            await school.save();
        } catch (err) {
            const error = new HttpError(
                'Something went wrong, could not update school.',
                500
            );
            console.log(err)
            return next(error);
        }
    }

    try {
        await tteacherRequest.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update status.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(tteacherRequest);

}

exports.createTeacherRequest = createTeacherRequest;
exports.getTeacherRequests = getTeacherRequests;
exports.updateTeacherRequest = updateTeacherRequest;