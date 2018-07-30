var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//======================================
//COMMENT ROUTES
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});    
        }
    });
});


router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
          Comment.create(req.body.comment, function(err, foundcomment){
              if(err){
                  console.log(err);
              }else {
                    foundcomment.author.id = req.user._id;
                    foundcomment.author.username = req.user.username;
                    foundcomment.save();
                  campground.comments.push(foundcomment);
                  campground.save();
                  req.flash("success","Successfully added a comment!!");
                  res.redirect('/campgrounds/'+ campground._id);
              }
          });
       }
   });
});

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
   Comment.findById(req.params.comment_id, function(err, foundcomment) {
       if(err){
           res.redirect("back");
       }else{
               res.render("comments/edit",{campground_id : req.params.id, comment : foundcomment});
       }
   });
});

router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.render("back");
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Deleted comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//======================================




module.exports = router;
