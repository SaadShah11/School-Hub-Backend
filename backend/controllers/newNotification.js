
const mongoose = require('mongoose');

const Users = require('../models/users');
const HttpError = require('../models/http-error');
var admin = require("firebase-admin")
var serviceAccount = require("../admin_private_key.json")

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/users?retryWrites=true&w=majority'
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

    let user;
    try {
        user = await Users.findById(uid);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        console.log(err)
        return next(error);
    }

    if (newNotification != undefined) {
        user.notification.push(newNotification)
    }

    if (user.deviceToken != undefined || user.deviceToken != '') {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://okay-945dc.firebaseio.com"
        });

        var regToken = user.deviceToken;

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

    let finalArr = []
    if (user.notification != undefined) {
        finalArr = user.notification.filter((item) => {
            if (item._id != notificationID) {
                return item
            }
        })
    }

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