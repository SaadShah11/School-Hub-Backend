
const express = require('express');
const search = require('../controllers/searchSchool.js')

const router = express.Router();

router.post('/search/:sName', search.getSchool)

router.get('/search/specificSchool/:sid', search.getSpecificSchool)

router.post('/search/', search.getSchool)

router.get('/search/', search.getAllSchools)

module.exports = router;