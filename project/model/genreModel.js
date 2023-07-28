const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Genre = Schema({
    genre: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("genre", Genre);