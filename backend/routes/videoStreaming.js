
const express = require('express');
const stream = require('../controllers/videoStreaming')

const router = express.Router();

router.get('/getStreams', stream.getStreams)

//router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)
router.post('/addStream', stream.createStream)//, dashboard.createPost)

router.patch('/updateStream/:streamid', stream.updateStatus)

module.exports = router;