const logstatususer_has_userController = require("../controllers/logstatususer_has_userController");

exports.create = async (req, res) => {
    data = req.body;
    //rules
    if (true) {
        logstatususer_has_user = await logstatususer_has_userController.create(data, res);
        return res.status(201).json(logstatususer_has_user);
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
            logstatususer_has_users = await logstatususer_has_userController.select(null, res);
            return res.status(200).json(logstatususer_has_users);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null; //We can build a filter object here
        //rules
        if (true) {
            logstatususer_has_users = await logstatususer_has_userController.select(filters, res);
            return res.status(200).json(logstatususer_has_users);
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
        logstatususer_has_user = logstatususer_has_userController.update(data, res);
        return res.status(200).json(logstatususer_has_user);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    data.cpf = req.params.id;
    //rules
    if (true) {
        logstatususer_has_user = await logstatususer_has_userController.delete(data, res);
        return res.status(200).json(logstatususer_has_user);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}