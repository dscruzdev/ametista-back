var jwt = require('jsonwebtoken');
const SECRET = process.env.JWTTOKEN;

exports.encode = async (payload) => {
    // encode

    return jwt.sign(payload, SECRET, {expiresIn: 300});
}

exports.decode = async (token) => {
    // decode
    return jwt.decode(SECRET, token, function (err, decodedPayload, decodedHeader) {
        if (err) {
            console.error(err.name, err.message);
            return {
                'error': err.name,
                'message': err.message
            }
        } else {
            console.log(decodedPayload, decodedHeader);
            return {
                'payload': decodedPayload,
                'header': decodedHeader
            }
        }
    });
}