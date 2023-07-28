const jwt = require('jsonwebtoken');
const user = require('../model/userModel')


exports.Logger = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                error: "Invalid token",
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedUser.id;
        req.userEmail = decodedUser.email;

        const foundUser = await user.findById(decodedUser.id);

        if (!foundUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        req.isAdmin = foundUser.status === "admin";

        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error,
        });
    }
};
