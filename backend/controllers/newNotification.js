
const mongoose = require('mongoose');

const Notification = require('../models/users');
const HttpError = require('../models/http-error');
var admin = require("firebase-admin")
var serviceAccount = require("../admin_private_key.json")

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/notification?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})



const updateNotification = async (req, res, next) => {

    let newNotification = req.body;
    console.log("Notification:")
    console.log(newNotification)
    const uid = req.params.uid;
    console.log(uid)

    let notification;
    try {
        notification = await Notification.findById(uid);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find notification.',
            500
        );
        console.log(err)
        return next(error);
    }

    if (newNotification != undefined) {
        notification.notification.push(newNotification)
    }

    if (notification.deviceToken != undefined || notification.deviceToken != '') {
        // admin.initializeApp({
        //     credential: admin.credential.cert(serviceAccount),
        //     databaseURL: "https://okay-945dc.firebaseio.com"
        // });
        if (admin.apps.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://okay-945dc.firebaseio.com"
            });
        }

        var regToken = notification.deviceToken;

        var payload = {
            data: {
                title: newNotification.notificationType,
                text: newNotification.text
            }
        };

        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };

        admin.messaging().sendToDevice(regToken, payload, options)
            .then(function (response) {
                console.log("Success: ", response);
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    }

    try {
        await notification.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update notification.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(notification);

}

const deleteNotification = async (req, res, next) => {

    const uid = req.params.uid;
    const notificationID = req.body.notificationID

    let notification;
    try {
        //notification = await Notification.findById(uid);
        notification = await Notification.find().exec();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find notification.',
            500
        );
        return next(error);
    }

    let finalArr = []
    if (notification != undefined) {
        finalArr = notification.filter((item) => {
            if (item._id != notificationID) {
                return item
            }
        })
    }

    notification = finalArr

    try {
        await notification.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete notification.',
            500
        );
        console.log(err)
        return next(error);
    }


    res.status(200).json(school);
}


exports.updateNotification = updateNotification;
exports.deleteNotification = deleteNotification;