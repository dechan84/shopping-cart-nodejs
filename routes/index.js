var express =require('express');
//The rouder allows the creation of modular handler instead of adding everything in the app.js
var router = express.Router({mergeParams: true});
//Adding model Product
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');


/* GET home page. */
router.get('/', function(req, res) {
    Product.find({}, function(err, allProducts){
        if(err){
            req.flash("error", err.message)
            console.log(err);
        }else{
            
            res.render ('shop/index',{products:allProducts})
        }
    });
});

router.get('/add-to-cart/:id', function(req, res){
    var productId = req.params.id;
    //This will create a new cart object, if there is a previous cart open in
    //the session use that one, else use an empty/new cart
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId, function(err, product){
        if (err){
            req.flash("error", "Product id not found")
            return res.redirect('/');
        } else {
            cart.add(product, product.id);
            req.session.cart = cart;
            req.flash("success", "New item added to the cart!")
            res.redirect('/');
        }
    });
});

router.get('/reduce/:id', function(req, res) {
    var productId = req.params.id;
    //This will create a new cart object, if there is a previous cart open in
    //the session use that one, else use an empty/new cart
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    cart.reduceByOne(productId);
    req.session.cart= cart;
    res.redirect('/shopping-cart');
});

router.get('/remove/:id', function(req, res) {
    var productId = req.params.id;
    //This will create a new cart object, if there is a previous cart open in
    //the session use that one, else use an empty/new cart
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    cart.removeItem(productId);
    req.session.cart= cart;
    res.redirect('/shopping-cart');
});

router.get('/shopping-cart', function(req, res) {
    if (!req.session.cart){
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products:cart.generateArray(), totalPrice: cart.totalPrice});
});



router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart=new Cart(req.session.cart);
    res.render('shop/checkout', {total: cart.totalPrice});
});

router.post('/checkout', isLoggedIn, function(req, res, next){
    if (!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    //Stripe goes here...
});

module.exports = router;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //Storing the current user url in my session
    req.session.oldUrl=req.url;
    res.redirect('/user/signin')
}