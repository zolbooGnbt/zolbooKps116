const express = require('express');
const router = express.Router();
const { createCategory, getAllCategory } = require('../controller/categoryController');
const { Logger } = require('../middleware/logger')

router.route('/')
    .post(Logger, createCategory)
    .get(getAllCategory)


module.exports = router;