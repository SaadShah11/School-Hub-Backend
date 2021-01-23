
const express = require('express')
const parser = require('body-parser')

const userManagementRoutes = require('./routes/user_management.js')
const dashboardRoutes = require('./routes/dashboard.js')

//const shopRoutes = require('./routes/shop.js')

const app = express();

//app.use(parser.urlencoded({extended:true})) //This statement parses the form data and automatically uses next
app.use(parser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

/*
app.use('/',(req, res, next) => {
    //This middleware always runs
    next()
})
*/

//app.get() -- For GET requests only
//app.post() -- For POST requests only

/*

//This middleware runs for both GET and POST requests
app.use('/add',(req, res, next) => {
    //This is the Add Product middleware
    res.send("<form action='/product' method='POST'><input type='text' name='title'><button>Add Product</button></form>")
})

app.post('/product',(req,res,next)=>{
    console.log(req.body) //body is already parsed via the top middleware
    res.redirect('/')
})

*/

//app.use(adminRoutes);
app.use('/user_management', userManagementRoutes)

app.use('/dashboard', dashboardRoutes)
//When all middlewares start with same routes then we do this, only the routes starting
//with the admin will enter this method
//We can aslo use same routes/paths for 2 different middlewares if one is get and other is post

//app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).send('<h1>404 Page Not Found</h1>')
    //res.status(404).sendFile(path.join(__dirname, 'views', 'error.html')) //If you create a error html file
})// Default path is '/'

/*
app.use('/',(req, res, next) => {
    //This middleware runs for all other routes
    res.send("<h1>Hello Saad Here</h1>")
})
*/

app.listen(8080)