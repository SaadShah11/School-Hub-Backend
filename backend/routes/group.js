
const express = require('express');
const group = require('../controllers/group.js')
//const file_upload = require('../middleware/file_upload')

const router = express.Router();

router.post('/createGroup', group.createGroup)

//router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)
router.get('/getAllGroups', group.getGroups)//, dashboard.createPost)

//router.patch('/updateComment/:pid', dashboard.addComments)

//router.patch('/updateLike/:pid', dashboard.addLikes)

module.exports = router;