const User = require('../model/userModel');
const MyError = require('../utils/myError');
const { generateToken } = require('../utils/tokenGenerate')

exports.register = async (req, res, next) => {
    try {
        const createUser = await User.create(req.body);
        res.status(200).json({
            success: true,
            createUser
        })
    } catch {
        throw new MyError(` Cannot register new user`, 403)
    }
};

exports.login = async (req, res, next) => {
    
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email: email })
        if (!findUser) {
            throw new MyError(`password or email wrong`, 404)
        };
        const check = await findUser.CheckPassword(password);
        if (!check) {
            throw new MyError(`password or email wrong`, 404)
        }
        const token = generateToken(findUser._id, findUser.email)
        res.status(200).json({
            success: true,
            findUser,
            token,
        })
    } catch {
        throw new MyError(`password or email wrong`, 404)
    }
}

  