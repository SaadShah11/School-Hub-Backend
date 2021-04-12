
const express = require('express');
const dashboard = require('../controllers/dashboard_mongoose.js')
const file_upload = require('../middleware/file_upload')

const router = express.Router();

router.get('/home', dashboard.getPosts)

//router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)
router.post('/post', dashboard.createPost)//, dashboard.createPost)

router.patch('/updateComment/:pid', dashboard.addComments)

router.patch('/updateLike/:pid', dashboard.addLikes)

module.exports = router;