
const express = require('express');
const review = require('../controllers/userReview')

const router = express.Router();

router.get('/reviews', review.getReviews)

//router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)
router.post('/addReview', review.createReview)//, dashboard.createPost)

//router.patch('/:pid', review.updateReview)

module.exports = router;