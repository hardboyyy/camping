var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/campgrounds",function(req,res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else
    {
         res.render("campgrounds/campground",{campground:allCampgrounds, currentUser : req.user});
    }
    });
   
});

router.post("/campgrounds",middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.Description;
    var newCampground = {name : name , image : image , description: desc };
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            }
            else
        {
            newlyCreated.author.id = req.user._id;
            newlyCreated.author.username = req.user.username;
            newlyCreated.save();
           // newlyCreated.campgrounds.push(newCampground);
             res.redirect("/campgrounds");
        }
        });
    
    
});

router.get("/campgrounds/new",middleware.isLoggedIn ,function(req, res) {
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
             if(err){
                console.log(err);
            }
            else
        {   
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });

});

//CAMPGROUND EDIT ROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership ,function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
            }else{
           res.render("campgrounds/edit", {campground:foundCampground});
            }
    });   
});
//CAMPGROUND UPDATE ROUTE

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});





module.exports = router;

