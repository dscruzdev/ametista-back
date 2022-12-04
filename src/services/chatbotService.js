const clientController = require("../controllers/clientController");
const requestController = require("../controllers/requestController");
const conversationController = require('../controllers/conversationController');
const subjectController = require('../controllers/subjectController');

const fbid = process.env.FBPAGEID;
const whatsappnumber = process.env.WHATSAPPNUMBER;

const fs = require("fs");
const { json } = require("body-parser");
const { Console } = require("console");
const { match } = require("assert");

exports.newclient = async (req, res) => {
    data = req.body.body;
    //Não pode repetir email
    //Não pode repetir CPF
    //rules
    const converted = JSON.parse(data);
    // const converted = {
    //     cpf: cpf.split("=")[1].split("}")[0],
    //     name: name.split("=")[1].split("}")[0],
    //     email: email.split("=")[1].split("}")[0],
    //     phone: phone.split("=")[1].split("}")[0],
    // }
    if (true) {
        client = await clientController.create(converted, res);
        client.dataValues.first_name = client.name.split(" ")[0];
        return res.status(201).json(client);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.findclient = async (req, res) => {
    const body = req.body.body;
    //rules
    var converted = JSON.parse(body);

    console.log("With filter");
    const filter = {
        cpfClients: converted.cpfClients ? converted.cpfClients : null,
        name: converted.name ? converted.name : null,
        email: converted.email ? converted.email : null,
        phone: converted.phone ? converted.phone : null
    };
    const reg = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        console.log(body);
    if (!converted.cpfClients.match(reg)) {
        return res.status(400).json({ "message": "CPF no formato inválido" });
    }
    Object.keys(filter).forEach(key => {
        if (filter[key] == null) {
            console.log("Filter " + filter[key] + " has been deleted");

            delete filter[key];
        }
    });
    if (true) {
        clients = await clientController.select(filter, res);

        switch (clients.length) {
            case 0:
                return res.status(404).json({ 'message': 'No one register found' })
                break;
            case 1:
                clients[0].dataValues.first_name = clients[0].name.split(" ")[0];
                return res.status(200).json(clients[0]);
            default:
                console.log(clients);

                return res.status(200).json(clients);
                break;
        }


    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }

}

exports.newrequest = async (req, res) => {
    data = req.body.body;

    var preconvert = data.split(",");
    var toconvert = preconvert[0] + "," + preconvert[1] + "," + preconvert[2] + "," + preconvert[3] + "," + preconvert[4] + "," + preconvert[5] + "," + preconvert[6] + "," + preconvert[7] + "}";
    const converted = JSON.parse(toconvert);
    var to;
    if (data.includes("messenger")){
        to = preconvert[8].slice(12, preconvert[8].length - 1);
    }else if(data.includes("whatsapp")){
        to = preconvert[8].slice(12, preconvert[8].length - 1);
    }else{
        to = preconvert[8].slice(3, preconvert[8].length - 1);
    }
    console.log(data);
    console.log("----------------------------------------");
    console.log(converted);
    console.log("----------------------------------------");
    console.log(to);
    console.log("----------------------------------------");
    //rules
    if (true) {
        request = await requestController.create(converted, res);
        var sid;
        sid = await conversationController.newConversation(request.idRequests);
        if (request.idChannels == "2" || request.idChannels == "3") {
            to = "+" + to;
        }

        request.set({ SID: sid, to: to });

        await request.save();

        //Colocar uma pessoa na conversation criada
        switch (request.idChannels) {
            case "1":
                try {
                    conversationController.newParticipantMessenger(sid, fbid, to);
                } catch (error) {
                    return res.status(500).json(error)
                }
                break;
            case "2":
                try {
                    conversationController.newParticipantWhatsapp(sid, whatsappnumber, to);
                } catch (error) {
                    return res.status(500).json(error)
                }
                break;
            case "3":
                try {
                    conversationController.newParticipantSMS(sid, fbid, to);
                } catch (error) {
                    return res.status(500).json(error)
                }
                break;
            default:
                conversationController.newParticipantMessenger(sid, fbid, to);
                console.log("Caimos no default");
                break;
        }

        //Colocar uma pessoa na conversation criada
        //adicionar o tipo de comunicador a essa conversa

        //adicionar o tipo de comunicador a essa conversa
        //var io = req.app.get('socketio');
        //io.to(request[0].idRequests).emit("receive_message", messagetosend);
        return res.status(201).json(request);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.checkcall = async (req, res) => {
    data = req.body.body;

    var to = data.split(`"From":`)[1].split(",")[0].toString();
    var bodyMessage = data.split(`"Body":`)[1].split(",")[0].toString();
    to = to.slice(1, to.length - 1);
    bodyMessage = bodyMessage.slice(1, bodyMessage.length - 1);
    var request;
    if (data.includes("messenger") || data.includes("whatsapp")) {
        request = await requestController.select({ to: to.split(":")[1], status: "open" });
    } else {
        request = await requestController.select({ to: to, status: "open" });
    }

    if (request.length == 0) {
        var idChannels = 0;
        if (data.includes("messenger")) {
            idChannels = 1;
        } else if (data.includes("whatsapp")) {
            idChannels = 2;
        } else {
            idChannels = 3;
        }
        return res.status(404).json({ "message": "Request not found", "idChannels": idChannels });
    } else {
        var io = req.app.get('socketio');
        io.emit("new_request", request);
        console.log("Enviou");
        return res.status(200).json(request);
    }
}

exports.getoptions = async (req, res) => {
    const subjects = await subjectController.select(null, res);
    if (subjects.length == 0) {
        return res.status(404).json({ "message": "No subjects found" });
    } else {
        var subjectstring = "";
        subjects.forEach(subject => {
            subjectstring += subject.idSubjects + ". " + subject.name + "\n ";
        });
        const finalresponse = subjectstring.slice(1, subjectstring - 3);
        return res.status(200).json({ subjectstring });
    }
}

exports.checksubject = async (req, res) => {
    const data = req.body.body;
    console.log(data);
    const converted = JSON.parse(data);
    const subjects = await subjectController.select({ idSubjects: converted.idSubjects }, res);
    if (subjects.length == 0) {
        return res.status(404).json({ "message": "No subjects found" });
    } else {
        return res.status(200).json(subjects[0]);
    }
}

exports.endrequest = async (req, res) => {
    const data = req.body.body;
    const csat = data.split(`"CSAT":`)[1].split(",")[0];
    const nps = data.split(`"NPS":`)[1].split(",")[0];
    const idRequests = data.split(`"idRequests":`)[1].split(",")[0];

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
