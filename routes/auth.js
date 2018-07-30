var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
//ROUTES    
router.get("/",function(req,res){
    res.render("landpage");
});


//PASSPORT ROUTES
router.get("/register", function(req, res) {
   res.render("register"); 
});

router.post("/register", function(req, res) {
    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
      passport.authenticate("local")(req,res, function(){
          req.flash("success", "Welcome to Yelpcamp "+ user.username);
          res.redirect("/campgrounds");
      }) ; 
    });
});

router.get("/login",function(req, res) {
   res.render("login"); 
});

router.post("/login",passport.authenticate("local",{
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}),function(req, res) {
    
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","You logged out Successfully");
    res.redirect("/campgrounds");
});

module.exports = router;