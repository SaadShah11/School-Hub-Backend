const mongoose = require('mongoose');

const teacherRequest = require('../models/teacherRequest');
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
        teacherID: req.body.tecaherID,
        teacherName: req.body.tecaherName,
        schoolID: req.body.schoolID,
        adminID: req.body.adminID,
        status: req.body.status,
        teacherProfilePic: req.body.tecaherProfilePic,
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
    console.log(newStatus)

    const teacherRequestID = req.params.tid;

    let teacherRequest;
    try {
        teacherRequest = await teacherRequest.findById(teacherRequestID);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update status.',
            500
        );
        return next(error);
    }

    teacherRequest.status = newStatus

    try {
        await teacherRequest.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update status.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(teacherRequest);

}

exports.createTeacherRequest = createTeacherRequest;
exports.getTeacherRequests = getTeacherRequests;
exports.updateTeacherRequest = updateTeacherRequest;