const jwt = require('jsonwebtoken');
const User = require('../model/userModel');


exports.protectFunction = async (req, res, next) => {
    const userToken = req.headers.authorization;
    if (!userToken) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Missing token' });
    }

    try {
        const token = userToken.split(' ')[1];
        const verifierToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verifierToken.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        req.user = user;
        
        if (user.status !== "admin") {
            return res.status(403).json({ success: false, message: "Admin access required." });
        }



        next();
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
};



