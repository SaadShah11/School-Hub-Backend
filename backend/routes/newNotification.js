
const express = require('express');
const newNotification = require('../controllers/newNotification')

const router = express.Router();

router.patch('/addNotification/:uid', newNotification.updateNotification)

router.patch('/deleteNotification/:uid', newNotification.deleteNotification)

module.exports = router;