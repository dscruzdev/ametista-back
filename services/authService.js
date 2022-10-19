const userController = require('../controllers/userController');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    filter = {
        email: email ? email : null,
        password: password ? password : null,
    }
    response = await userController.select(filter, res);
    res.status(200).json(response);
}