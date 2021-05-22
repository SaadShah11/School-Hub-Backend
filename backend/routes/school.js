
const express = require('express');
const school = require('../controllers/school_mongoose.js')

const router = express.Router();

router.get('/School_Details', school.getSchool)

//router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)
router.post('/Create_School', school.createSchool)//, dashboard.createPost)

router.patch('/Edit_School/:sid', school.editSchool)

router.post('/delete_School/:sid', school.deleteSchool)

router.post('/delete_Teacher/:sid', school.deleteTeacher)

module.exports = router;