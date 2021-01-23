const path = require('path');
//path works for both windows and linux

const express = require('express');
const rootDir = require('../util/path.js')

const router = express.Router();

router.get('/',(req, res, next) => {
    //This middleware runs for all other routes
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')) //Here .. is also fine (Seperator / not assumed)
    //__dirname has the absolute path from root folder of system to the current file folder i.e routes 
})

module.exports = router;