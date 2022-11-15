const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWTTOKEN;

exports.login = async (req, res) => {
    const { email, password } = req.body;
    filter = {
        email: email ? email : null,
        password: password ? password : null,
    }
    var response = await userController.selectOne(filter, res);
    if (response) {
        const now = Date.now();
        const token = jwt.sign({
            uid: response.uid,
            when: now,
            from: req.rawHeaders
        }, SECRET, {expiresIn:300});

        return res.status(200).json({"status":"Authenticated","token":token});
    }else{
        return res.status(404).json({"message":"Usuário não encontrado", "status":404});
    }
}

exports.info = async (req, res) => {
    const token = req.headers['x-token'];

    decoded = jwt.decode(token);

    return res.status(200).json(decoded);

}