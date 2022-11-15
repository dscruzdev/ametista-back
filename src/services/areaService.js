const areaController = require("../controllers/areaController");

exports.create = async (req, res) => {
    data = req.body;
    //Só admin acessa aqui
    //Não pode ser duplicado (não pode ter o mesmo nome)
    if (true) {
        area = await areaController.create(data, res);
        return res.status(201).json(area);
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
            areas = await areaController.select(null, res);
            return res.status(200).json(areas);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null; //We can build a filter object here
        //rules
        if (true) {
            areas = await areaController.select(filters, res);
            return res.status(200).json(areas);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.update = async (req, res) => {
    data = req.body;
    data.idAreas = req.params.id;
    //rules
    if (true) {
        area = areaController.update(data, res);
        return res.status(200).json(area);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    const data = {};
    data.idAreas = req.params.id;
    //rules
    if (true) {
        area = await areaController.delete(data, res);
        return res.status(200).json(area);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}