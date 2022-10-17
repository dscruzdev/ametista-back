const userController = require("../controllers/userController");

exports.create = async (req, res) => {
    data = req.body;
    //rules
    if (true) {
        user = await userController.create(data, res);
        return res.status(201).json(user);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    data = req.body;
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
        const filters = null;
        //rules
        if (true) {
            users = await userController.select(filters, res);
            return res.status(200).json(users);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.update = async (req, res) => {
    data = req.body;
    data.cpf = req.params.id;
    //rules
    if (true) {
        user = await userController.update(data, res);
        return res.status(200).json(user);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    data.cpf = req.params.id;
    //rules
    if (true) {
        user = await userController.delete(data, res);
        return res.status(200).json(user);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}