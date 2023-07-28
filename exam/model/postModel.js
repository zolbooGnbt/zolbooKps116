const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = Schema({
    image:{
        type:String,
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: "category"
    }],
    uploadedDate:{
        type : Date,
        default: Date.now,
        required: true
    },
});


module.exports = mongoose.model("post", Post);