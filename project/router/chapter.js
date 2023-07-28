const express = require('express');
const router = express.Router();
const { Logger } = require('../middleware/logger');
const { createChapter, getAllChapter, getChapterById, getChapterDelete, getChapterByIdUpdate } = require('../controller/chapterController');
const { addCommentToChapter, getAllCommentsByChapterId } = require('../controller/commentController');

router.route('/addChapter').post(Logger, createChapter);
router.route('/:id')
    .get(getAllChapter)
    .get(getChapterById)
    .delete(Logger, getChapterDelete)
    .put(Logger, getChapterByIdUpdate)

router.route('/comment/:id')
    .post(Logger, addCommentToChapter)
    .get(getAllCommentsByChapterId)


module.exports = router;