const express = require('express');
const router = express.Router();
const { createGenre, getAllGenre, getGenreDelete, getGenreById, getGenreByIdUpdate } = require('../controller/genreController');
const { Logger } = require('../middleware/logger')

router.route('/create').post(Logger, createGenre);
router.route('/').get(getAllGenre)
router.route("/:id")
    .delete(Logger, getGenreDelete)
    .get(getGenreById)

module.exports = router;