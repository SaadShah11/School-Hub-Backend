
const express = require('express');
const dashboard = require('../controllers/dashboard_mongoose.js')
const file_upload = require('../middleware/file_upload')

const router = express.Router();

router.get('/home', dashboard.getPosts)

router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)

router.get('/signup', (req, res, next) => {

}) 

router.post('/signup')//, userManagement.createUser)

module.exports = router;