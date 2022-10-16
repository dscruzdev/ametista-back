const clientController = require("../controllers/clientController");

exports.create = (req, res) => {
    data = req.body;
    //rules
    if (true) {
        clientController.create(data, res);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = (req, res) => {
    data = req.body;
    if (req.query.filter == undefined) {
        //We should create the 'filter' param to check if have filters and later get
        //all the params to filter the response
        console.log("No filter");
        //rules
        if (true) {
            clientController.select(null, res);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null;
        //rules
        if (true) {
            
            clientController.select(filters, res);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.update = (req, res) => {
    data = req.body;
    data.cpf = req.params.id;
    if (true) {
        clientController.update(data, res);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}