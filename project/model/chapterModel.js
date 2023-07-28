const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment =require('./commentModel')

const Chapter = Schema({
    chapter: {
        type: String,
        required: true
    },
    story:[{
        type: String,
        required: true
    }],
    novelName: {
        type: mongoose.Types.ObjectId,
        ref: "novel"
    },
    uploadedDate:{
        type : Date,
        default: Date.now,
        required: true
    },
    comment:[Comment.schema]
    
});

module.exports = mongoose.model("chapter", Chapter);