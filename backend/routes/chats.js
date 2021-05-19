const express = require('express');
const chat = require('../controllers/chats.js')
//const file_upload = require('../middleware/file_upload')

const router = express.Router();

router.post('/chatPost', chat.chat)

module.exports = router;