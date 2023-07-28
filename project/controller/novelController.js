const Novel = require("../model/novelModel")
const MyError = require('../utils/myError')


exports.createNovel = async (req, res, next) => {
    const isAdminUser = req.isAdmin;
    try {
        if (!isAdminUser) {
            return res.status(403).json({ error: 'Unauthorized: Only admins can create this novel' });
        }
        const { name, Author, Translator, Information, Genres, LicensedFrom, Editor, ReleaseSchedule, } = req.body;
        const fileName = req.file.filename;
        const newNovel = await Novel.create(
            {
                image: fileName,
                name: name,
                Author: Author,
                Translator: Translator,
                Information: Information,
                Genres: Genres,
                LicensedFrom: LicensedFrom,
                Editor: Editor,
                ReleaseSchedule: ReleaseSchedule
            }
        );

        res.status(200).json({
            success: true,
            newNovel
        })
    } catch (error) {
        console.error(error);
        throw new MyError(`Cannot create new novel: ${error.message}`, 403);
    }
}


exports.getAllNovel = async (req, res, next) => {
    try {
        const novels = await Novel.find()
        res.status(200).json({
            success: true,
            novels
        })
    } catch (error) {
        throw MyError('Internal server error', 403)
    }
};


exports.getNovelById = async (req, res, next) => {
    try {
        const novel = await Novel.findById(req.params.id);
        if (novel) {
            res.status(200).json({
                success: true,
                novel
            });
        } else {
            throw new MyError(`${req.params.id} is not valid`, 403);
        }
    } catch (error) {
        throw MyError(`${req.params.id} is not valid`, 403)
    }
}

exports.getNovelDelete = async (req, res, next) => {
    const isAdminUser = req.isAdmin;
    try {
        if (!isAdminUser) {
            return res.status(403).json({ error: 'Unauthorized: Only admins can delete this novel' });
        }
        const novelId = await Novel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            novelId
        })
    } catch (error) {
        throw MyError(`${req.params.id} is not valid`, 403);
    }
}

exports.getNovelByIdUpdate = async (req, res, next) => {
    const isAdminUser = req.isAdmin;
    try {
        if (!isAdminUser) {
            return res.status(403).json({ success: false, error: "Unauthorized: Only admins can update novels." });
        }

        const novelId = req.params.id;
        const updates = {
            name: req.body.name,
            Author: req.body.Author,
            Translator: req.body.Translator,
            Information: req.body.Information,
            Genres: req.body.Genres,
            LicensedFrom: req.body.LicensedFrom,
            Editor: req.body.Editor,
            ReleaseSchedule: req.body.ReleaseSchedule
        };

        if (req.file) {
            updates.image = req.file.filename;
        }

        const updatedNovel = await Novel.findByIdAndUpdate(novelId, updates, { new: true });

        if (!updatedNovel) {
            throw new MyError(`${novelId} is not a valid novel id`, 404);
        }

        res.status(200).json({
            success: true,
            updatedNovel
        });
    } catch (error) {
        throw new MyError(`Error updating novel: ${error.message}`, 403);
    }
};