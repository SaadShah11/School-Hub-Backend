const mongoose = require('mongoose');

const Review = require('../models/review');
const HttpError = require('../models/http-error');
const { json } = require('body-parser');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/reviews?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createReview = async (req, res, next) => {
    const createdReview = new Review({
        schoolID: req.body.schoolID,
        userID: req.body.userID,
        username: req.body.username,
        userProfilePic: req.body.userProfilePic,
        date: req.body.date,
        reviewText: req.body.reviewText,
        rating: req.body.rating
    })

    try {
        const result = await createdReview.save();
        res.status(200).send()
        res.json(result)
    } catch (err) {
        const error = new HttpError(
            'Post failed, please try again later.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(201).json({ review: createdReview.toObject({ getters: true }) });
}

const getReviews = async (req, res, next) => {
    const reviews = await Review.find().exec(); //Converting this into a promise using .exec()
    res.status(200).send(JSON.stringify(reviews))
}

exports.createReview = createReview;
exports.getReviews = getReviews;

