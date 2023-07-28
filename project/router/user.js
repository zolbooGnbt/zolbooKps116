const express = require('express');
const router = express.Router();
const { register, login, addToSavedBook, getSavedNovelList, deleteSavedNovelById, } = require('../controller/userController');
const { Logger } = require('../middleware/logger')
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/savedNovels')
    .post(Logger, addToSavedBook)
    .get(Logger,getSavedNovelList)
    .delete(Logger, deleteSavedNovelById)

module.exports = router;