const Novel = require('../model/novelModel')
const Review = require('../model/reviewModel')
const MyError = require('../utils/myError')


exports.addReviewToNovel = async (req, res, next) => {
  try {
    const novel = await Novel.findById(req.params.id);

    if (!novel) {
      return res.status(404).json({ success: false, error: "Novel not found." });
    }

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, error: "Review content is missing." });
    }

    const newComment = new Review({ content, user: req.userId });
    await newComment.save();

    novel.Review.push(newComment);
    await novel.save();

    res.status(200).json({ success: true, comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to add review." });
  }
};


exports.getAllReviewByNovelId = async (req, res, next) => {
  try {
    const novelId = req.params.id;
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ success: false, error: "Novel not found." });
    }

    const reviews = await Review.find({ _id: { $in: novel.Review} });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch reviews." });
  }
};