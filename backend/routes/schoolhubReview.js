
const express = require('express');
const review = require('../controllers/schoolhubReview')

const router = express.Router();

router.get('/schoolhubReviews', review.getReviews)

//router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)
router.post('/schoolhubReviews', review.createReview)//, dashboard.createPost)

//router.patch('/:pid', review.updateReview)

module.exports = router;