const requestController = require("../controllers/requestController");

exports.create = async (req, res) => {
    data = req.body;
    //rules
    if (true) {
        request = await requestController.create(data, res);
        return res.status(201).json(request);
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
            requests = await requestController.select(null, res);
            return res.status(200).json(requests);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null; //We can build a filter object here
        //rules
        if (true) {
            requests = await requestController.select(filters, res);
            return res.status(200).json(requests);
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
        request = requestController.update(data, res);
        return res.status(200).json(request);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    data.cpf = req.params.id;
    //rules
    if (true) {
        request = await requestController.delete(data, res);
        return res.status(200).json(request);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}