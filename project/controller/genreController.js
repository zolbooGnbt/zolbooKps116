const Genre = require('../model/genreModel');
const Novel = require('../model/novelModel')
const MyError = require('../utils/myError')


exports.createGenre = async (req, res, next) => {
    const name = req.body.genre;
    const isAdminUser = req.isAdmin;    
    try {
        if (!isAdminUser) {
            return res.status(403).json({ error: 'Unauthorized: Only admins can create this genre.' });
        }

        const newGenre = await Genre.create({ genre: name });

        res.status(200).json({
            success: true,
            newGenre
        })
    } catch {
        throw new MyError(` is wrong, cannot create new genre`, 403)
    }
};

exports.getAllGenre = async (req, res, next) => {
    try {
        const genres = await Genre.find()
        res.status(200).json({
            success: true,
            genres
        })
    } catch (error) {
        throw MyError('Internal server error', 403)
    }
}

exports.getGenreById = async (req, res, next) => {
    try {
        const genre = await Genre.findById(req.params.id).populate("genre");
        if (!genre) {
            throw new MyError(`${req.params.id} is not a valid genre id`, 403);
        }
        const novels = await Novel.find({ Genres: req.params.id });

        res.status(200).json({
            success: true,
            genre,
            novels
        });
    } catch (error) {
        throw new MyError(`Error retrieving genre: ${error.message}`, 403);
    }
};


exports.getGenreDelete = async (req, res, next) => {
    const isAdminUser = req.isAdmin;   
    try {
        if (!isAdminUser) {
            return res.status(403).json({ error: 'Unauthorized: Only admins can create this genre.' });
        }
        const genreID = await Genre.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            genreID
        })
    } catch (error) {
        throw MyError(`${req.params.id} is not valid`, 403)
    }
}
