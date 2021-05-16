
const express = require('express');
const teacherRequest = require('../controllers/teacherRequest')

const router = express.Router();

router.get('/getTeacherRequests', teacherRequest.getTeacherRequests)

//router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)
router.post('/addTeacherRequest', teacherRequest.createTeacherRequest)//, dashboard.createPost)

router.patch('/updateTeacherRequest/:tid', teacherRequest.updateTeacherRequest)

module.exports = router;