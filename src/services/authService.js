const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.JWTTOKEN;
const area_has_usersController = require("../controllers/area_has_userController");
const user_has_languagesController = require("../controllers/user_has_languageController");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    filter = {
        email: email ? email : null,
    }
    var response = await userController.selectOne(filter, res);
    response.password
    const testedpassword = await bcrypt.compare(password, response.password);

    if (response && testedpassword) {
        const now = Date.now();
        area_has_users = await area_has_usersController.select({cpfUsers: response.cpfUsers});
        user_has_languages = await user_has_languagesController.select({cpfUsers: response.cpfUsers});
        var areas = "";
        var languages = "";
        area_has_users.forEach(area => {
            areas += area.idAreas + ","
        });
        user_has_languages.forEach(language => {
            languages += language.idLanguages + ","
        });
        
        const token = jwt.sign({
            uid: response.uid,
            languages: languages.slice(0,languages.length-1),
            areas: areas.slice(0,areas.length-1),
            when: now,
            from: req.rawHeaders
        }, SECRET, {expiresIn:"8h"});

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