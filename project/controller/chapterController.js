const Chapter = require('../model/chapterModel')
const Novel = require('../model/novelModel')
const MyError = require('../utils/myError')

exports.createChapter = async (req, res, next) => {
    const isAdminUser = req.isAdmin;
    try {
        if (!isAdminUser) {
            return res.status(403).json({ error: 'Unauthorized: Only admins can create this chapter' });
        }
        const newChapter = await Chapter.create(req.body);

        res.status(200).json({
            success: true,
            newChapter
        })
    } catch (error) {
        console.error(error);
        throw new MyError(`Cannot create add chapter: ${error.message}`, 403);
    }
}

exports.getAllChapter = async (req, res, next) => {
    try {
        const novel = await Novel.findById(req.params.id).populate("Genres");
        if (!novel) {
            throw new MyError(`${req.params.id} is not a valid novel id`, 403);
        }
        const chapters = await Chapter.find({ novelName: req.params.id });

        res.status(200).json({
            success: true,
            novel,
            chapters
        });
    } catch (error) {
        throw new MyError(`Error retrieving chapters: ${error.message}`, 403);
    }
};


exports.getChapterById = async (req, res, next) => {
    try {
        const chapter = await Chapter.findById(req.params.id);
        if (chapter) {
            res.status(200).json({
                success: true,
                chapter
            });
        } else {
            throw new MyError(`${req.params.id} is not valid`, 403);
        }
    } catch (error) {
        throw MyError(`${req.params.id} is not valid`, 403)
    }
}

exports.getChapterDelete = async (req, res, next) => {
    const isAdminUser = req.isAdmin;
    try {
        if (!isAdminUser) {
            return res.status(403).json({ error: 'Unauthorized: Only admins can delete this chapter' });
        }
        const chapterId = await Chapter.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            chapterId
        })
    } catch (error) {
        throw MyError(`${req.params.id} is not valid`, 403);
    }
}


exports.getChapterByIdUpdate = async (req, res, next) => {
    const isAdminUser = req.isAdmin;
    try {
        if (isAdminUser) {
            const chapterId = req.params.id;
            const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, req.body, { new: true });

            if (!updatedChapter) {
                throw new MyError(`${chapterId} is not a valid chapter id`, 404);
            }

            res.status(200).json({
                success: true,
                updatedChapter
            });
        } else {
            res.status(403).json({ success: false, error: "Unauthorized: Only admins can update chapters." });
        }
    } catch (error) {
        throw new MyError(`Error updating chapter: ${error.message}`, 403);
    }
};

