const jsw = require('jsonwebtoken');

exports.generateToken = (id, email) => {
    const token = jsw.sign({ id: id, email: email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}