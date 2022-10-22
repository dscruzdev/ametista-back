const user_has_requestController = require("../controllers/user_has_requestController");

exports.create = async (req, res) => {
    data = req.body;
    //rules
    if (true) {
        user_has_request = await user_has_requestController.create(data, res);
        return res.status(201).json(user_has_request);
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
            user_has_requests = await user_has_requestController.select(null, res);
            return res.status(200).json(user_has_requests);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null;
        //rules
        if (true) {

            user_has_requests = user_has_requestController.select(filters, res);
            return res.status(200).json(user_has_requests);

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
        user_has_request = await user_has_requestController.update(data, res);
        return res.status(200).json(user_has_request);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    data.cpf = req.params.id;
    //rules
    if (true) {
        user_has_request = await user_has_requestController.delete(data, res);
        return res.status(200).json(user_has_request);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}