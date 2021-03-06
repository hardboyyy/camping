var mongoose = require("mongoose");
var commmentSchema = mongoose.Schema({
    comment : String,
    author : {
        id :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    },
    createdAt : { type : Date , default : Date.now }
});

module.exports = mongoose.model("Comment", commmentSchema);