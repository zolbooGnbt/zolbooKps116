const Chapter = require('../model/chapterModel')
const Comment = require('../model/commentModel')
const MyError = require('../utils/myError')


exports.addCommentToChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.id);

    if (!chapter) {
      return res.status(404).json({ success: false, error: "Chapter not found." });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, error: "Comment content is missing." });
    }

    const newComment = new Comment({ content, user: req.userId });
    await newComment.save();

    chapter.comment.push(newComment);
    await chapter.save();

    res.status(200).json({ success: true, comment: newComment });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ success: false, error: "Failed to add comment." });
  }
};

  
exports.getAllCommentsByChapterId = async (req, res, next) => {
  try {
    const chapterId = req.params.id;
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, error: "Chapter not found." });
    }

    const comments = await Comment.find({ _id: { $in: chapter.comment } });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ success: false, error: "Failed to fetch comments." });
  }
};

  