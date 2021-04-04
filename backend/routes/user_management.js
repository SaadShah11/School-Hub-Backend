
const express = require('express');
const userManagement = require('../controllers/user_management_mongoose.js')

const router = express.Router();
//const app = express();

router.get('/login', userManagement.getUser)


router.post('/login', userManagement.userLogin)

router.get('/signup', (req, res, next) => {

}) 

router.patch('/userProfile/updateProfilePic/:uid', userManagement.updateProfilePic)

router.patch('/userProfile/updateProfile/:uid', userManagement.updateProfile)

router.post('/signup', userManagement.createUser)

router.get('/userProfile/:uid', userManagement.getSpecificUser)

module.exports = router;