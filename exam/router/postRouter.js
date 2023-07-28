const express = require('express');
const router = express.Router();
const { Logger } = require('../middleware/logger')
const { Upload } = require('../middleware/upload');
const { createPost, getAllPost, getPostById, deletePost, updatePost } = require('../controller/postController');

router.route('/')
    .post(Logger, Upload.single('image'), createPost)

router.route('/allPosts')
    .get(getAllPost)  // hereglegch hamaarahgui buh post
router.route('/:id')
    .get(getPostById)  //neg post awna
    .delete(Logger, deletePost) // zuwhun post  bichsen hereglegch ustgana
    .put(Logger, updatePost); //zuwhun post  bichsen hereglegch edit hiine



module.exports = router;