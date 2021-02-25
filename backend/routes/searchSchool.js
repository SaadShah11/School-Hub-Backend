
const express = require('express');
const search = require('../controllers/searchSchool.js')

const router = express.Router();

router.get('/search/:sName', search.getSchool)

//router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)
//router.post('/Create_School', school.createSchool)//, dashboard.createPost)

//router.patch('/Edit_School/:sid', school.editSchool)

module.exports = router;