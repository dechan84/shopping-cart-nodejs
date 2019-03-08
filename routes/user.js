var express =require('express');
//The rouder allows the creation of modular handler instead of adding everything in the app.js
var router = express.Router({mergeParams: true});
//Adding model Product
var Product = require('../models/product');
//Protection midleware against CSRF malware
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require("passport");
var Product = require('../models/product');
var Order = require('../models/order');
var Cart = require('../models/cart');

//All the router will be protected against csrf
router.use(csrfProtection);

//Profile will be available only if is logged in
router.get('/profile', isLoggedIn, function(req, res) {
    //I want to show in the profile the orders made by the user
    //I check the Order model in mongo and see if the current user
    //has any orders
    Order.find({
        user: req.user
    }, function(err, orders){
        if (err){
            req.flash("error", err.message)
            res.redirect('/');
        }
        //After finding the user for the order I will generate a new cart for
        //each order object using the generateArray method previously defined
        var cart;
        orders.forEach(function(order){
            // creating a new cart object using the order.cart as the 'oldCart' parameter
             cart = new Cart(order.cart);
             // this return a list of the items in that cart and store it in each order
             order.items = cart.generateArray();
        });
        //Returning the orders object (with each item per order) to the view profile
        res.render('user/profile',{orders:orders});
    });
});

//Logout option will only be accesible if logged in first
router.get('/logout', isLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
})

//All the remaining options will only be available if not
//log in, this will be a filter, of course another option
//would be to add notLoggedIn middleware to the remaining
//routes but using the first one we already filter that
router.use('/', notLoggedIn, function(req, res, next){
    next();
});

router.get('/signup', function(req, res){
    var messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length>0
    });
});

router.post('/signup', passport.authenticate('local.signup',{
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next){
    if(req.session.oldUrl){
        //We retrieve the oldUrl, clear it and redirect
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl=null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile')
    }
});

router.get('/signin', function(req, res) {
    var messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length>0
    });
});

router.post('/signin', passport.authenticate('local.signin',{
    failureRedirect: '/user/signin',
    failureFlash: true
}), function(req, res, next){
    if(req.session.oldUrl){
        //We retrieve the oldUrl, clear it and redirect
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl=null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile')
    }
});

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}

function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
  //  req.session.oldUrl=req.url;
    res.redirect('/')
}