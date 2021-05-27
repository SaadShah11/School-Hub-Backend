const mongoose = require('mongoose');

const videoStreaming = require('../models/videoStreaming');
const HttpError = require('../models/http-error');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/videoStreaming?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createStream = async (req, res, next) => {
    const createdStream = new videoStreaming({
        schoolID: req.body.schoolID,
        schoolName: req.body.schoolName,
        schoolIcon: req.body.schoolIcon,
        title: req.body.title,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        currentTime: req.body.currentTime,
        description: req.body.description,
        privacy: "Public",
        status: "Pending",
        resourceURI: "",
        isLive: false
    })

    try {
        const result = await createdStream.save();
        res.status(200).send()
        //res.status(201).json({ stream: createdStream.toObject({ getters: true }) });
        //res.json(result)
    } catch (err) {
        const error = new HttpError(
            'Stream Request failed, please try again later.',
            500
        );
        console.log(err)
        return next(error);
    }

    //res.status(201).json({ stream: createdStream.toObject({ getters: true }) });
}

const getStreams = async (req, res, next) => {
    const streams = await videoStreaming.find().exec(); //Converting this into a promise using .exec()
    res.status(200).send(JSON.stringify(streams))
}

const updateStatus = async (req, res, next) => {
    let newStatus = req.body.status;
    console.log(newStatus)

    const streamID = req.params.streamid;

    let stream;
    try {
        stream = await videoStreaming.findById(streamID);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update LiveStream.',
            500
        );
        return next(error);
    }

    stream.status = newStatus

    try {
        await stream.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update LiveStream.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(stream);

}

const updateURL = async (req, res, next) => {
    let newURL = req.body.resourceURI;
    let newBool = req.body.isLive;

    console.log(newURL)
    console.log(newBool)

    const streamID = req.params.streamid;

    let stream;
    try {
        stream = await videoStreaming.findById(streamID);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update LiveStream.',
            500
        );
        return next(error);
    }

    stream.resourceURI = newURL
    stream.isLive = newBool

    try {
        await stream.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update LiveStream.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(stream);

}

exports.createStream = createStream;
exports.getStreams = getStreams;
exports.updateStatus = updateStatus;
exports.updateURL = updateURL;