const mongoose = require('mongoose');


const connectDB = async () => {
    const connect = await mongoose.connect(process.env.mongodb_openUri);
    return connect;
}

module.exports = connectDB