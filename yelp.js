
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash     = require("connect-flash");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seed.js");
var passport = require("passport"), localStrat = require("passport-local"), User = require("./models/user");
var campgroundsRoutes = require("./routes/campgrounds"),
    commentRoutes     = require("./routes/comments"),
    authRoutes        = require("./routes/auth");
 //seedDB();
mongoose.connect("mongodb://localhost/yelpcamp");
//PASSPORT CONFIGURATION
app.use(flash());
app.use(require("express-session")({
   secret : "I was framed",
   resave : false,
   saveUninitialized : false
}));

app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.locals.moment = require("moment");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(authRoutes);
app.use(campgroundsRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!!!");
});