
const mongoose = require('mongoose');

const Post = require('../models/post');
const HttpError = require('../models/http-error');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/dashboard?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createPost = async (req, res, next) => {
    const createdPost = new Post({
        //type: req.body.type,
        userID: req.body.userID,
        username: req.body.username,
        text: req.body.text,
        image: req.body.path,
        likes: req.body.likes,
        time: req.body.time,
        //no comment at start
        comments: []
    })

    try {
        await createdPost.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    res.status(201).json({ post: createdPost.toObject({ getters: true }) });
    //const result = await createdPost.save();
    //res.json(result)
};

const getPosts = async (req, res, next) => {
    const post = await Post.find().exec(); //Converting this into a promise using .exec()
    res.json(post);
}

exports.createPost = createPost;
exports.getPosts = getPosts;

/*
Sample Data
{
    "userID": 879,
    "username": "saad",
    "text": null,
    "image":"uploads/images/image.jpeg",
    "likes":20,
    "time": {
        "Date":"12/06/2020",
        "Time":"12:00 PM"
    },
    "comments":{
        "username":"mubeen","text":"hello",
    }
}

*/