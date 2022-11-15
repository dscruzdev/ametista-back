const SECRET = process.env.JWTTOKEN;
const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
    const token = req.headers['x-token'];
    const route = req.baseUrl;
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ "message": "invalid token", "error": err, "route": route }).end();

        next();
    });
};