
const express = require('express');
const userManagement = require('../controllers/user_management_mongoose.js')

const router = express.Router();
//const app = express();

//router.get('/login', userManagement.getUser)

router.post('/login', userManagement.superAdminLogin)

module.exports = router;