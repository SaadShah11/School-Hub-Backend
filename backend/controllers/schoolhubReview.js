const mongoose = require('mongoose');

const Review = require('../models/schoolhubReview');
const HttpError = require('../models/http-error');
const { json } = require('body-parser');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/schoolhubReviews?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createReview = async (req, res, next) => {
    const createdReview = new Review({
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
            'Review Failed, please try again later.',
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
    console.log(newReply)
    //console.log("inside Reply")
    //console.log(newReply)
    const reviewID = req.params.rid;

    let review;
    try {
        review = await Review.findById(reviewID);
        console.log("review")
        console.log(review)

    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update post.',
            500
        );
        return next(error);
    }

    //let allComments = review.comments;

    // && newReply.text != undefined && newReply.username != undefined
    //&& newReply.userID != undefined
    if (newReply != null && newReply != undefined && newReply.text != undefined) {
        console.log(review.reply)
        review.reply.push(newReply)
        console.log("NewReply")
        console.log(newReply)
    }

    try {
        await review.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update review.',
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

