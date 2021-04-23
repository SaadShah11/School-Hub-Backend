
const mongoose = require('mongoose');

const Group = require('../models/group');
const HttpError = require('../models/http-error');
const { json } = require('body-parser');
const defaultPic = 'https://firebasestorage.googleapis.com/v0/b/okay-945dc.appspot.com/o/images%2FDefaultPic.png?alt=media&token=172c25b2-5f82-4321-8589-a2b33972bebb'

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/groups?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createGroup = async (req, res, next) => {
    const createdGroup = new Group({
        //type: req.body.type,
        userID: req.body.userID,
        username: req.body.username,
        groupImg: defaultPic,
        groupName: req.body.groupName,
        description: req.body.description,
        time: req.body.time,
        invites: [],
        //no comment at start
        members: [],
        posts: []
    })
    console.log("inside create Group 1")

    try {
        console.log("Inside Create Group")
        const result = await createdGroup.save();
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

    res.status(201).json({ group: createdGroup.toObject({ getters: true }) });
    //const result = await createdPost.save();
    //res.json(result)
};

const getGroups = async (req, res, next) => {
    const groups = await Group.find().exec(); //Converting this into a promise using .exec()
    res.status(200).send(JSON.stringify(groups))
    //res.json(post);
}

const addComments = async (req, res, next) => {
    let newComment = req.body.comments;
    // let newLikes = req.body.likes;
    // let newTotalLikes = 0

    const postId = req.params.pid;

    let post;
    try {
        post = await Group.findById(postId);
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
        post = await Group.findById(postId);
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

exports.createGroup = createGroup;
exports.getGroups = getGroups;
exports.addComments = addComments;
exports.addLikes = addLikes;

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