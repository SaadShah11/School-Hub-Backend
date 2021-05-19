
const express = require('express')
const parser = require('body-parser')
//const cors = require('cors')

const userManagementRoutes = require('./routes/user_management.js')
const dashboardRoutes = require('./routes/dashboard.js')
const schoolRoutes = require('./routes/school.js')
const searchSchoolRoutes = require('./routes/searchSchool.js')
const reviewRoutes = require('./routes/review.js')
const videoStreamingRoutes = require("./routes/videoStreaming")
const schoolhubReviewRoutes = require("./routes/schoolhubReview")
const groupRoutes = require("./routes/group")
const superAdminRoutes = require("./routes/superAdmin")
const teacherRequestRoutes = require("./routes/teacherRequest")
const chatRequestRoutes = require("./routes/chats")

//const shopRoutes = require('./routes/shop.js')

const app = express();

//app.use(parser.urlencoded({extended:true})) //This statement parses the form data and automatically uses next
//app.use(cors());
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

app.use('/review', reviewRoutes)

app.use('/mainReview', schoolhubReviewRoutes)

app.use('/videoStreaming', videoStreamingRoutes)

app.use('/school', schoolRoutes)

app.use('/searchSchool', searchSchoolRoutes)

app.use('/groups', groupRoutes)

app.use('/superAdmin', superAdminRoutes)

app.use('/teacherRequest', teacherRequestRoutes)
chatRequestRoutes
app.use('/chat', chatRequestRoutes)

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