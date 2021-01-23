const path = require('path')

const express = require('express');
const rootDir = require('../util/path.js')


const router = express.Router();

router.get('/add',(req, res, next) => {
    //This is the Add Product middleware
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
})

router.post('/product',(req,res,next)=>{
    console.log(req.body) //body is already parsed via the top middleware
    res.redirect('/')
})

module.exports = router;