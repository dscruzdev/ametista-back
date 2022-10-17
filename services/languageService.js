const languageController = require("../controllers/languageController");

exports.create = async (req, res) => {
    data = req.body;
    //rules
    if (true) {
        language = await languageController.create(data, res);
        return res.status(201).json(language);
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
            languages = await languageController.select(null, res);
            return res.status(200).json(languages);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null; //We can build a filter object here
        //rules
        if (true) {
            languages = await languageController.select(filters, res);
            return res.status(200).json(languages);
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
        language = languageController.update(data, res);
        return res.status(200).json(language);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    data.cpf = req.params.id;
    //rules
    if (true) {
        language = await languageController.delete(data, res);
        return res.status(200).json(language);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}