const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  content: {
    type: String,
    required: true
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;