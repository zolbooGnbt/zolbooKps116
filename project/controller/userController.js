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

exports.addToSavedBook = async (req, res, next) => {
    const { novelId } = req.body;
    try {
        const addToList = await User.findOneAndUpdate(
            {
                $addToSet: {
                    savedNovels: novelId
                }
            }
        );
        res.status(200).json({
            success: true,
            addToList
        });
    }catch{
        throw new MyError(`not added to saved novel list`, 404)
    }
};

exports.getSavedNovelList = async (req, res, next) => {
  try {
    const list = await User
      .findById(req.userId)
      .select("savedNovels")
      .populate("savedNovels")
      .exec();

    res.status(200).json({
      success: true,
      list
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to get the saved Novel List." });
  }
};

exports.deleteSavedNovelById = async (req, res, next) => {
    try {
      const userId = req.userId;
      const savedNovelId = req.params.id;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, error: "User not found." });
      }
  
      const indexToDelete = user.savedNovels.indexOf(savedNovelId);
  
      if (indexToDelete === -1) {
        return res.status(404).json({ success: false, error: "Saved Novel not found in the user's list." });
      }

      user.savedNovels.splice(indexToDelete, 1);
  
      await user.save();
  
      res.status(200).json({ success: true, message: "Saved Novel deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to delete Saved Novel." });
    }
  };
  