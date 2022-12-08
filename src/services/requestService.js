const requestController = require("../controllers/requestController");
const userController = require("../controllers/userController");
const user_has_requestController = require("../controllers/user_has_requestController");
const conversationController = require("../controllers/conversationController");
const logstatusrequest_has_requestController = require("../controllers/logstatusrequest_has_requestController");

const { Op } = require("sequelize");
const Request = require("../models/mRequest");

exports.create = async (req, res) => {
    data = req.body;
    //return res.status(418).json(data);
    //rules
    if (true) {
        var sid;
        request = await requestController.create(data, res);
        sid = await conversationController.newConversation(request.idRequests);
        request.set({ SID: sid });
        await request.save();
        return res.status(201).json(request);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    const { idRequests, cpfClients, category, endedAt, description,
        deadline, priority, status, idlanguage, idsubject,
        createdAt, updatedAt, channels_id, CSAT, CES, NPS, SID } = req.body;
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
            idRequests: idRequests ? idRequests : null,
            cpfClients: cpfClients ? cpfClients : null,
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
            CSAT: CSAT ? CSAT : null,
            CES: CES ? CES : null,
            NPS: NPS ? NPS : null,
            SID: SID ? SID : null,
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
    data.cpfClients = req.params.id;
    //rules
    if (true) {
        request = requestController.update(data, res);
        return res.status(200).json(request);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.setScore = async (req, res) => {
    const { csat, nps, idRequests } = req.body;

    const request = await requestController.find(parseInt(idRequests));
    if (parseInt(csat) > 0 && parseInt(csat) <= 5) {
        request.set({ CSAT: csat });
    }
    if (parseInt(nps) > 0 && parseInt(nps) <= 10) {
        request.set({ NPS: nps });
    }
    await request.save();
    return res.status(201).json(request);

}

exports.delete = async (req, res) => {
    data.idRequests = req.params.id;
    //rules
    if (true) {
        request = await requestController.delete(data, res);
        return res.status(200).json(request);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.setScore = async (req, res) => {
    const { csat, nps, idRequests } = req.body;

    const request = await requestController.find(parseInt(idRequests));
    if (parseInt(csat) > 0 && parseInt(csat) <= 5) {
        request.set({ CSAT: csat });
    }
    if (parseInt(nps) > 0 && parseInt(nps) <= 10) {
        request.set({ NPS: nps });
    }
    await request.save();
    return res.status(201).json(request);

}

exports.chattouser = async (user, idRequests) => {
    const now = new Date();
    const users = await userController.select({ uid: user });
    const requests = await requestController.select({ idRequests: idRequests });
    const oneUser = users[0];
    const oneRequest = requests[0];
    if (oneRequest.openedAt == null) {
        oneRequest.update({
            openedAt: now
        });
        await user_has_requestController.create({ cpfUsers: oneUser.cpfUsers, idRequests: idRequests });
        await logstatusrequest_has_requestController.create({ idLogStatusRequests: 2, idRequests: idRequests });
        oneRequest.save();
    }
    //Emitir socket para sumir este chamado da tela dos outros



    console.log(`O usuário ${user} abriu o chat ${idRequests}`);
}