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
    const { id, client_cpf, category, endedAt, description,
        deadline, priority, status, idlanguage, idsubject,
        createdAt, updatedAt, channels_id, csat, ces, nps } = req.body;
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
        const filter = {
            id: id ? id : null,
            client_cpf: client_cpf ? client_cpf : null,
            category: category ? category : null,
            endedAt: endedAt ? endedAt : null,
            description: description ? description : null,
            deadline: deadline ? deadline : null,
            priority: priority ? priority : null,
            status: status ? status : null,
            idlanguage: idlanguage ? idlanguage : null,
            idsubject: idsubject ? idsubject : null,
            createdAt: createdAt ? createdAt : null,
            updatedAt: updatedAt ? updatedAt : null,
            channels_id: channels_id ? channels_id : null,
            csat: csat ? csat : null,
            ces: ces ? ces : null,
            nps: nps ? nps : null,
        };
        Object.keys(filter).forEach(key => {
            if (filter[key] == null) {
                delete filter[key];
            }
        });
        //rules
        if (true) {
            requests = await requestController.select(filter, res);
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