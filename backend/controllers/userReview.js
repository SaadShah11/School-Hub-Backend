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
        rating: req.body.rating,
        reply: []
    })

    try {
        const result = await createdReview.save();
        res.status(200).send()
        res.json(result)
    } catch (err) {
        const error = new HttpError(
            'Review failed, please try again later.',
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

const addReply = async (req, res, next) => {
    let newReply = req.body;
    console.log("inside addreply")
    const reviewID = req.params.rid;
    console.log(newReply)
    console.log(reviewID)

    let review;
    try {
        review = await Review.findById(reviewID);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update post.',
            500
        );
        return next(error);
    }

    //let allComments = review.comments;

    // && newReply.text != undefined && newReply.username != undefined
    // && newReply.userID != undefined
    if (newReply != null && newReply != undefined) {
        review.reply.push(newReply)
        console.log(newReply)
    }

    try {
        await review.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update post.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(review);

}

exports.createReview = createReview;
exports.getReviews = getReviews;
exports.addReply = addReply;

