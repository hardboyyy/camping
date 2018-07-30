var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name : "khsss",
        image : "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022_960_720.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum "   
    },
    {
        name : "hhhh",
        image : "https://thumb1.shutterstock.com/thumb_large/526873/496080748/stock-photo-travel-trailer-caravaning-rv-park-camping-at-night-496080748.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
];


function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed");
        
        data.forEach(function(seed){
            Campground.create(seed, function(err, camp){
                if(err){
                    console.log(err);
                }else{
                    
                    console.log("added camp");
                    Comment.create({comment : "This is the great place i visited so far", author : "hhhh"}, function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                
                            camp.comments.push(comment);
                            camp.save();  
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;