const express = require('express');
const router = express.Router();
const { Logger } = require('../middleware/logger')
const { Upload } = require('../middleware/upload');
const { createNovel, getAllNovel, getNovelById, getNovelDelete, getNovelByIdUpdate } = require('../controller/novelController');
const { addReviewToNovel, getAllReviewByNovelId } = require('../controller/reveiwController');

router.route('/create').post(Logger, Upload.single('image'), createNovel);
router.route('/').get(getAllNovel)
router.route('/:id')
    .get(getNovelById)
    .delete(Logger, getNovelDelete)
    .put(Logger, getNovelByIdUpdate)
    router.route('/').get(getAllNovel)
router.route('/review/:id')
    .post(Logger, addReviewToNovel)
    .get(getAllReviewByNovelId)

module.exports = router;