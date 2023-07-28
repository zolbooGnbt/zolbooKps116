const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  content: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;