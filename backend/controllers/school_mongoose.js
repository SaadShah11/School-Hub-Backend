
const mongoose = require('mongoose');

const School = require('../models/school');
const HttpError = require('../models/http-error');
const { json } = require('body-parser');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/school?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createSchool = async (req, res, next) => {
    const createdSchool = new Post({
        //type: req.body.type,
        adminID: req.body.adminID,
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        images: req.body.images
    })

    try {
        await createdSchool.save();
        res.status(200).send()
    } catch (err) {
        const error = new HttpError(
            'creating school failed, please try again later.',
            500
        );
        return next(error);
    }

    res.status(201).json({ post: createdSchool.toObject({ getters: true }) });
    //const result = await createdPost.save();
    //res.json(result)
};

const getSchool = async (req, res, next) => {
    const school = await school.find().exec(); //Converting this into a promise using .exec()
    res.status(200).send(JSON.stringify(school))
    //res.json(post);
}

const editSchool = async (req, res, next) => {

    let newName = req.body.name;
    let newDecription = req.body.description;
    let newAdderss = req.body.adders;
    let newImages = req.body.images;

    const schoolId = req.params.sid;

    let school;
    try {
        school = await School.findById(schoolId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update place.',
            500
        );
        return next(error);
    }

    let allImages = school.images;

    //console.log(newLikes)
    //console.log('Break')
    //post.comments = allComments.push(newComment)
    //post.comments = newComment;

    school.name = newName;
    school.decription = newSescription;
    school.address = newAddress;

    if (newImages != null) {
        school.images.push(newImages)
    }



    //console.log(post.comments)

    try {
        await school.save();
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

exports.createSchool = createSchool;
exports.getSchool = getSchool;
exports.editSchool = editSchool;

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