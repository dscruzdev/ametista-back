const area_has_subjectController = require("../controllers/area_has_subjectController");

exports.create = async (req, res) => {
    data = req.body;
    //rules
    if (true) {
        area_has_subject = await area_has_subjectController.create(data, res);
        return res.status(201).json(area_has_subject);
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
            area_has_subjects = await area_has_subjectController.select(null, res);
            return res.status(200).json(area_has_subjects);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null; //We can build a filter object here
        //rules
        if (true) {
            area_has_subjects = await area_has_subjectController.select(filters, res);
            return res.status(200).json(area_has_subjects);
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
        area_has_subject = area_has_subjectController.update(data, res);
        return res.status(200).json(area_has_subject);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    data.cpf = req.params.id;
    //rules
    if (true) {
        area_has_subject = await area_has_subjectController.delete(data, res);
        return res.status(200).json(area_has_subject);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}