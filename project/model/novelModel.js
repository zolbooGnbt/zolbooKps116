const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviewModel')

const Novel = Schema({
    image:{
        type:String,
    },
    name: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Translator: {
        type: String,
        required: true
    },
    Information: {
        type: String,
        required: true
    },
    LicensedFrom:{
        type: String,
        required: false
    },
    Editor:{
        type: String,
        required: false
    },
    ReleaseSchedule:{
        type: String,
        required: true
    },
    Genres: [{
        type: mongoose.Types.ObjectId,
        ref: "genre"
    }],
    Review:[Review.schema]
});


module.exports = mongoose.model("novel", Novel);