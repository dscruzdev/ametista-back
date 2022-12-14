const userController = require("../controllers/userController");
const area_has_userController = require("../controllers/area_has_userController");
const user_has_languageController = require("../controllers/user_has_languageController");
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
    data = req.body;
    console.log(data);
    //data.user_image = "/images/"+req.file.originalname;
    //rules
    if (true) {
        data.password = await bcrypt.hash(data.password,8);
        user = await userController.create(data, res);
        data.areas.forEach((area) => {area_has_userController.create({cpfUsers: user.dataValues.cpfUsers, idAreas: area.value})})
        data.languages.forEach((language) => {user_has_languageController.create({cpfUsers: user.dataValues.cpfUsers, idLanguages: language.value})})
        return res.status(201).json(user);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    data = req.body;
    filter = {
        cpf: data.cpf ? data.cpf : null,
        name: data.name ? data.name : null,
        email: data.email ? data.email : null,
        password: data.password ? data.password : null,
        status: data.status ? data.status : null,
        user_level: data.user_level ? data.user_level : null,
        created_at: data.created_at ? data.created_at : null,
        updated_at: data.updated_at ? data.updated_at : null,
    }
    Object.keys(filter).forEach(key => {
        if (filter[key] == null) {
            delete filter[key];
        }
        
    });

    if (req.query.filter == undefined) {

        //We should create the 'filter' param to check if have filters and later get
        //all the params to filter the response
        console.log("No filter");
        //rules
        if (true) {
            users = await userController.select(null, res);
            return res.status(200).json(users);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        //rules
        if (true) {
            //return res.status(200).json(filter);

            users = await userController.select(filter, res);
            return res.status(200).json(users);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.update = async (req, res) => {
    data = req.body;
    data.cpfUsers = req.params.id;
    //rules
    if (true) {
        user = await userController.update(data, res);
        return res.status(200).json(user);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    const data = {};
    data.cpfUsers = req.params.id;
    //rules
    if (true) {
        user = await userController.delete(data, res);
        return res.status(200).json(user);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}