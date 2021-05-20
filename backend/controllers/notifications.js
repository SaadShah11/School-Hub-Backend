const mongoose = require('mongoose');

const Notification = require('../models/notifications');
const HttpError = require('../models/http-error');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/notifications?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createNotifications = async (req, res, next) => {
    const createNotification = new Notification({
        notificationType: req.body.notificationType,
        text: req.body.text,
        displayTo: req.body.displayTo,
        seen: []
    })

    try {
        const result = await createNotification.save();
        res.status(200).send()
        //res.status(201).json({ stream: createdStream.toObject({ getters: true }) });
        //res.json(result)
    } catch (err) {
        const error = new HttpError(
            'Notification Creation failed, please try again later.',
            500
        );
        console.log(err)
        return next(error);
    }

    //res.status(201).json({ stream: createdStream.toObject({ getters: true }) });
}

const getNotifications = async (req, res, next) => {
    const notifications = await Notification.find().exec(); //Converting this into a promise using .exec()
    res.status(200).send(JSON.stringify(notifications))
}

const updateNotification = async (req, res, next) => {
    let newSeen = req.body;
    console.log(req.body)

    const notificationID = req.params.nid;
    console.log(notificationID)

    let notificationn;
    try {
        notificationn = await Notification.findById(notificationID);
        console.log("Teacher")
        console.log(notificationn)
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find notification.',
            500
        );
        return next(error);
    }

    if (newSeen != undefined || newSeen.userID != '' || newSeen.userID != undefined) {
        notificationn.seen.push(newSeen)

        try {
            await Notification.save();
        } catch (err) {
            const error = new HttpError(
                'Something went wrong, could not update notification.',
                500
            );
            console.log(err)
            return next(error);
        }

        res.status(200).json(notificationn);
    } else {
        res.status(500)
    }

}




exports.createNotifications = createNotifications;
exports.getNotifications = getNotifications;
exports.updateNotification = updateNotification;