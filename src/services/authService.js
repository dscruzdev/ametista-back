const userController = require('../controllers/userController');
const jwt = require('./jwtService');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    filter = {
        email: email ? email : null,
        password: password ? password : null,
    }
    var response = await userController.selectOne(filter, res);
    const now = Date.now();
    token = await jwt.encode({
        cpf:response.cpf,
        when:now,
        from:req.rawHeaders
    });

    return res.status(200).json(token);
}

exports.info = async (req, res) => {
    const {token} = req.body;

    // decoded = await jwt.decode(token);

    return res.status(418).json(req.cpf);

}