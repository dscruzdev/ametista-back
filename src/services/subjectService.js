const subjectController = require("../controllers/subjectController");
const area_has_subjectController = require("../controllers/area_has_subjectController");

exports.create = async (req, res) => {
    data = req.body;
    var tocreate = {name:data.name}
    //rules
    if (true) {
        subject = await subjectController.create(tocreate, res);
        data.areas.forEach((area) => {area_has_subjectController.create({idSubjects: subject.dataValues.idSubjects, idAreas: area.value})})
        return res.status(201).json(subject);
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
            subjects = await subjectController.select(null, res);
            return res.status(200).json(subjects);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null;
        //rules
        if (true) {
            subjects = await subjectController.select(filters, res);
            return res.status(200).json(subjects);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.update = async (req, res) => {
    data = req.body;
    data.idSubjects = req.params.id;
    //rules
    if (true) {
        subject = await subjectController.update(data, res);
        return res.status(200).json(subject);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    const data = {};
    data.idSubjects = req.params.id;
    //rules
    if (true) {
        subject = await subjectController.delete(data, res);
        return res.status(200).json(subject);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}