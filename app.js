//Express setup
var express = require('express');
var app = express();

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property
var bodyParser = require('body-parser');

//Parse Cookie header and populate req.cookies with an object keyed by the cookie names
var cookieParser = require('cookie-parser');

//Enable mongoose for mondoDB-Node interaction
var mongoose= require('mongoose');

//Enable session middleware for management
var session = require('express-session')

//Passport is authentication middleware for Node.js.
var passport      = require('passport');

//Show notification messages
var flash = require('connect-flash');

//This allows to store a session in somewhere else and not the default
//one (Memory storage); needs to be after session setup
var MongoStore = require('connect-mongo')(session);

//Path to product model
var Product= require ('./models/product');

//Routes
//Adding validation to login
var validator = require('express-validator');
//Adding user routes paths
var userRoutes = require('./routes/user');
//Homepage path
var routes = require("./routes/index");

//Adding moment to all our files
app.locals.moment = require("moment");

app.use(bodyParser.json());
/*If we are going to use csrf protection, extended must be false*/
app.use(bodyParser.urlencoded({extended: false}));

//Validator must be done after body-parser
app.use(validator());

app.use(cookieParser());

//This session needs to be stored in the new session store
app.use(session({
    secret: 'comasa is the best',
    resave: false,
    saveUninitialized: false,
    //Because we already are using a mongo connection, we decide to reuse it
    //instead of creating a new connection
    store: new MongoStore({ mongooseConnection:mongoose.connection}),
    //Define a time limit for a session, the parameters is in ms, that's why
    //we do the multiplications for 3h
    cookie: {maxAge: 180*60*1000}
}));

//Flash and passport needs to be initialized after the session
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

/*Add specific folder/path to external files for express to look into it*/
app.use(express.static(__dirname + "/public"));

/*Make express to accept ejs files (or any other extension), this will
allow you to not type ejs extension in each render parameter*/
app.set("view engine", "ejs");

//local area connection
mongoose.connect("mongodb://localhost/shop_profiles");
//Load passport configuration
require('./config/passport');

//This global needs to be called before the routes but after all previous passport configurations
app.use(function(req, res, next){
    //This gave us the 'is or is not LogIn' parameter for each template/routes/ejs
    res.locals.login = req.isAuthenticated();
    //This gave us the session parameter for each template/routes/ejs
    res.locals.session = req.session;
    //Adding local var for error and success flash
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    
    next();
});

//The order is important, because all request would go to index instead of user
app.use('/user', userRoutes);
app.use('/', routes);


app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The Shop Server is connected!")
})
