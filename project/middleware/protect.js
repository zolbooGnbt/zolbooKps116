const jwt = require('jsonwebtoken');
const User = require('../model/loginModel');

exports.protectFunction = (req, res, next) => {
    const userToken = req.headers.authorization;
    let token;
    if (!userToken) {
        return res.status(400).json({ success: false });
    }
    token = userToken.split(" ")[1]; 
    
    try {
        const verifierToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(verifierToken.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (user.status !== "admin") {
            return res.status(403).json({ success: false, message: "Admin access required." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ success: false, error: error });
    }
};
