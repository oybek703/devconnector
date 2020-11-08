const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(403).json({msg: 'No token provided, authorization is denied.'});
    }
    try {
        const {user} = jwt.verify(token, config.get('JWT_SECRET'));
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send('Invalid token.');
    }
};