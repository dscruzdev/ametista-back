const logstatusrequestController = require("../controllers/logstatusrequestController");

exports.create = async (req, res) => {
    data = req.body;
    //rules
    if (true) {
        logstatusrequest = await logstatusrequestController.create(data, res);
        return res.status(201).json(logstatusrequest);
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
            logstatusrequests = await logstatusrequestController.select(null, res);
            return res.status(200).json(logstatusrequests);
        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    } else {
        const filters = null; //We can build a filter object here
        //rules
        if (true) {
            logstatusrequests = await logstatusrequestController.select(filters, res);
            return res.status(200).json(logstatusrequests);
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
        logstatusrequest = logstatusrequestController.update(data, res);
        return res.status(200).json(logstatusrequest);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    data.cpf = req.params.id;
    //rules
    if (true) {
        logstatusrequest = await logstatusrequestController.delete(data, res);
        return res.status(200).json(logstatusrequest);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}