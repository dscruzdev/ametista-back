const clientController = require("../controllers/clientController");

exports.create = async (req, res) => {
    data = req.body;
    //rules
    if (true) {
        client = await clientController.create(data, res);
        return res.status(201).json(client);
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
            clients = await clientController.select(null, res);
            return res.status(200).json(clients);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null; //We can build a filter object here
        //rules
        if (true) {
            clients = await clientController.select(filters, res);
            return res.status(200).json(clients);
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
        client = clientController.update(data, res);
        return res.status(200).json(client);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    data.cpf = req.params.id;
    //rules
    if (true) {
        client = await clientController.delete(data, res);
        return res.status(200).json(client);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}