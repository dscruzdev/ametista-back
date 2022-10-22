const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ code: 401, error: err }
            );
        }
        req.cpf = decoded.cpf;
        next();
    })
}