
const mongoose = require('mongoose');

const Post = require('../models/post');
const HttpError = require('../models/http-error');
const { json } = require('body-parser');

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
        image: req.body.image,
        likes: req.body.likes,
        totalLikes: 0,
        time: req.body.time,
        //no comment at start
        comments: req.body.comments
    })

    try {
        const result = await createdPost.save();
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

    res.status(201).json({ post: createdPost.toObject({ getters: true }) });
    //const result = await createdPost.save();
    //res.json(result)
};

const getPosts = async (req, res, next) => {
    const post = await Post.find().exec(); //Converting this into a promise using .exec()
    res.status(200).send(JSON.stringify(post))
    //res.json(post);
}

const addComments = async (req, res, next) => {
    let newComment = req.body.comments;
    // let newLikes = req.body.likes;
    // let newTotalLikes = 0

    const postId = req.params.pid;

    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update post.',
            500
        );
        return next(error);
    }

    let allComments = post.comments;
    // let allLikes = post.likes

    //console.log(newLikes)
    //console.log('Break')
    //post.comments = allComments.push(newComment)
    //post.comments = newComment;
    if (newComment != null && newComment != undefined && newComment.text != undefined) {
        post.comments.push(newComment)
        console.log(newComment.text)
    }

    // if (newLikes != null && newLikes != undefined) {
    //     //newLikes = post.likes + newLikes
    //     post.likes.push(newLikes)
    //     console.log(newLikes)
    //     //post.likes = newLikes
    //     console.log(post)

    //     newTotalLikes = post.likes.filter(likeObject => likeObject.like===true)
    //     post.totalLikes = newTotalLikes.length
    //     console.log("Likes")
    //     console.log(newTotalLikes.length)

    // }

    //console.log(post.comments)

    try {
        await post.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update post.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(post);

}

const addLikes = async (req, res, next) => {

    let newLikes = req.body.likes;
    let newTotalLikes = 0
    let newUser = false;

    const postId = req.params.pid;

    let post;
    try {
        post = await Post.findById(postId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update post.',
            500
        );
        return next(error);
    }

    let allLikes = post.likes

    let existingUserLike = allLikes.filter(likeObject => likeObject.userID === newLikes.userID)

    if (existingUserLike.length != 0) {
        let arrayIndex;
        for(let i=0; i<=allLikes.length ;i++){
            if(allLikes[i].userID === newLikes.userID){
                arrayIndex = i;
                break;
            }
        }
        post.likes[arrayIndex].like = newLikes.like

        newTotalLikes = post.likes.filter(likeObject => likeObject.like === true)
        post.totalLikes = newTotalLikes.length
        console.log("Likes")
        console.log(newTotalLikes.length)
    } else {
        if (newLikes != null && newLikes != undefined) {
            //newLikes = post.likes + newLikes
            post.likes.push(newLikes)
            console.log(newLikes)
            //post.likes = newLikes
            console.log(post)

            newTotalLikes = post.likes.filter(likeObject => likeObject.like === true)
            post.totalLikes = newTotalLikes.length
            console.log("Likes")
            console.log(newTotalLikes.length)
        }
    }

    try {
        await post.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update post.',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(200).json(post);

}

const deletePost = async (req, res, next) => {

    const postID = req.params.pid;

    let post;
    try {
        post = await Post.deleteOne({ _id: postID });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not delete Post.',
            500
        );
        return next(error);
    }

    res.status(200).json(post);
}

exports.createPost = createPost;
exports.getPosts = getPosts;
exports.addComments = addComments;
exports.addLikes = addLikes;
exports.deletePost = deletePost

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