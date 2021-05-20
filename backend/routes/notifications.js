
const express = require('express');
const notification = require('../controllers/notifications')

const router = express.Router();

router.get('/getNotifications', notification.getNotifications)

//router.post('/post', file_upload.single('image'), dashboard.createPost)//, dashboard.createPost)
router.post('/addNotification', notification.createNotifications)//, dashboard.createPost)

router.patch('/updateNotification/:nid', notification.updateNotification)

module.exports = router;