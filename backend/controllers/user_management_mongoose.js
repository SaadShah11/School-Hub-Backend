
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../models/users');
const HttpError = require('../models/http-error');

mongoose.connect(
    'mongodb+srv://saad:saad@schoolhub.zmtqr.mongodb.net/users?retryWrites=true&w=majority'
).then(() => {
    console.log("DB connected")
}).catch(() => {
    console.log('Error occured, DB connection failed ')
})

const createUser = async (req, res, next) => {
    const createdUser = new Users({
        type: req.body.type,
        email: req.body.email,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password
    })

    let existingUser;
    try {
        let query = { email: createdUser.email }
        existingUser = await Users.findOne(query).exec();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        console.log(err)
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    let hashedPassword;
    try {
        //Number signifies difficulty level of hashing
        hashedPassword = await bcrypt.hash(createdUser.password, 12)
        createdUser.password = hashedPassword
        console.log(hashedPassword)
        const result = await createdUser.save();
        console.log(typeof createdUser._id)
        res.status(200)
        //res.json(result)
    } catch (err) {
        const error = new HttpError(
            'Hashing Failed',
            500
        );
        console.log(err)
        return next(error);
    }

    let token;
    //check official docs of wen tokens to undestand the options for the 3rd optional parameters, using expire is recommended
    try {
        token = jwt.sign({ _id: createdUser._id, username: createdUser.username, email: createdUser.email, type: createdUser.type },
            "secret_key",
            { expiresIn: "1h" })
    } catch (err) {
        const error = new HttpError(
            'Token generation Failed',
            500
        );
        console.log(err)
        return next(error);
    }

    res.status(201).json({ token: token })

};

const getUser = async (req, res, next) => {
    const user = await Users.find().exec(); //Converting this into a promise using .exec()
    res.json(user);
    res.status(200).send(JSON.stringify(user));
}

const userLogin = async (req, res, next) => {
    const { type, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await Users.findOne({ email: email })
    } catch (err) {
        const error = new HttpError('Email error occured', 500);
        res.status(500).send()
        return next(error)
    }

    //if (!existingUser || existingUser.password !== password || existingUser.type !== type) {
    if (!existingUser || existingUser.type !== type) {
        const error = new HttpError('Wrong credentials', 401)
        res.status(401).send()
        return next(error)
    }

    let isPassValid = false;
    try {
        isPassValid = await bcrypt.compare(password, existingUser.password)
    } catch (err) {
        const error = new HttpError('Hashing error', 500);
        res.status(500).send()
        return next(error)
    }

    if (!isPassValid) {
        const error = new HttpError('Wrong Password', 401)
        res.status(401).send()
        return next(error)
    }

    let token;
    //check official docs of wen tokens to undestand the options for the 3rd optional parameters, using expire is recommended
    try {
        token = jwt.sign({ _id: existingUser._id, username: existingUser.username, email: existingUser.email, type: existingUser.type },
            "secret_key",
            { expiresIn: "1h" })
    } catch (err) {
        const error = new HttpError(
            'Token generation Failed',
            500
        );
        console.log(err)
        return next(error);
    }

    console.log('Login Successful')
    //res.json({ message: "login successful" })
    res.status(200).send(JSON.stringify({ _id: existingUser._id, username: existingUser.username, type: existingUser.type, token: token }));
}

exports.createUser = createUser;
exports.getUser = getUser;
exports.userLogin = userLogin;