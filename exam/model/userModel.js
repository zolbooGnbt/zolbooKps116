const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema({
    username: {
        type: String,
        require: [true, " hereglegch burtgelttei bna"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum:["user","admin"],
        default:"user"
    }
});

User.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

User.methods.CheckPassword = async function (password) {
    const check = await bcrypt.compare(password, this.password);
    return check;
};

module.exports = mongoose.model("user", User);