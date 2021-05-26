
const mongoose = require('mongoose');

const Users = require('../models/users');
const HttpError = require('../models/http-error');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/users?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})


const getUser = async (req, res, next) => {
    const user = await Users.find().exec(); //Converting this into a promise using .exec()
    res.json(user);
    res.status(200).send(JSON.stringify(user));
}

const getSpecificUser = async (req, res, next) => {
    const uid = req.params.uid;
    console.log(uid)

    var query = { _id: uid };
    console.log(query)

    const user = await Users.find(query).exec();
    //user = await Users.findById(uid);
    res.json(user);
    res.status(200).send(JSON.stringify(user));
}

const updateProfilePic = async (req, res, next) => {
    let newProfilePic = req.body.profilePic;

    const uid = req.params.uid;

    let user;
    try {
        user = await Users.findById(uid);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update user.',
            500
        );
        return next(error);
    }

    user.profilePic = newProfilePic

    try {
        await user.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update user.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(user);

}

const updateNotification = async (req, res, next) => {

    let newNotification = req.body;
    console.log("Notification:")
    console.log(newNotification)
    const uid = req.params.uid;

    let user;
    try {
        user = await Users.findById(uid);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        return next(error);
    }

    if (newNotification != undefined) {
        user.notification.push(newNotification)
    }

    try {
        await user.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update user.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(user);

}


const deleteNotification = async (req, res, next) => {

    const uid = req.params.uid;
    const notificationID = req.body.notificationID

    let user;
    try {
        user = await Users.findById(uid);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        return next(error);
    }

    let finalArr = user.notification.filter((item)=>{
        if(item._id != notificationID){
            return item
        }
    })

    user.notification = finalArr

    try {
        await user.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update user.',
            500
        );
        console.log(err)
        return next(error);
    }


    res.status(200).json(school);
}


exports.updateNotification = updateNotification;
exports.deleteNotification = deleteNotification;