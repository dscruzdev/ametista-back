const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = process.env.JWTTOKEN;
const area_has_usersController = require("../controllers/area_has_userController");
const user_has_languagesController = require("../controllers/user_has_languageController");
const whatsapp = process.env.WHATSAPPNUMBER;


exports.login = async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;
    filter = {
        email: email ? email : null,
    }

    var response = await userController.selectOne(filter, res);
    if (response) {
        const testedpassword = await bcrypt.compare(password, response.password);

        if (testedpassword) {
            const now = Date.now();
            area_has_users = await area_has_usersController.select({ cpfUsers: response.cpfUsers });
            user_has_languages = await user_has_languagesController.select({ cpfUsers: response.cpfUsers });
            var areas = "";
            var languages = "";
            area_has_users.forEach(area => {
                areas += area.idAreas + ","
            });
            user_has_languages.forEach(language => {
                languages += language.idLanguages + ","
            });
            const separatedName = response.name.split(" ");

            const token = jwt.sign({
                uid: response.uid,
                username: separatedName[0] + " " + separatedName[separatedName.length - 1].slice(0, 1).toUpperCase() + ".",
                firstName: separatedName[0],
                lastName: separatedName[separatedName.length - 1],
                user_level: response.user_level,
                languages: languages.slice(0, languages.length - 1),
                areas: areas.slice(0, areas.length - 1),
                when: now,
                from: req.rawHeaders
            }, SECRET, { expiresIn: "8h" });

            return res.status(200).json(
                {
                    "firstName": separatedName[0],
                    "id": response.uid,
                    "lastName": separatedName[separatedName.length - 1],
                    "role": (response.user_level == 1 ? "Admin" : "Attendant"),
                    "token": token,
                    "languages": languages.slice(0, languages.length - 1),
                    "areas": areas.slice(0, areas.length - 1),
                    "email": response.email,
                    "phone": whatsapp,
                    "username": separatedName[0] + " " + separatedName[separatedName.length - 1].slice(0, 1).toUpperCase() + ".",
                });
        }
    } else {
        return res.status(401).json({ "message": "Usuário não encontrado", "status": 401 });
    }
}

exports.info = async (req, res) => {
    const token = req.headers['x-token'];

    decoded = jwt.decode(token);

    return res.status(200).json(decoded);

}