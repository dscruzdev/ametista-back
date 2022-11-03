const clientController = require("../controllers/clientController");
const requestController = require("../controllers/requestController");
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
        console.log("Ele quer criar um novo cliente");

        client = await clientController.create(converted, res);
        client.dataValues.first_name = client.name.split(" ")[0];
        return res.status(201).json(client);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.findclient = async (req, res) => {
    const body = req.body.body;
    //Somente Admin e atendente acessa aqui

    //rules
    var converted = JSON.parse(body);

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
        console.log("With filter");
        const filter = {
            cpf: converted.cpf ? converted.cpf : null,
            name: converted.name ? converted.name : null,
            email: converted.email ? converted.email : null,
            phone: converted.phone ? converted.phone : null
        };

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
                    console.log("Don't returned client");
                    return res.status(404).json({ 'message': 'No one register found' })
                    break;
                case 1:
                    console.log("Retuned 1 client");
                    clients[0].dataValues.first_name = clients[0].name.split(" ")[0];
                    return res.status(200).json(clients[0]);
                default:
                    console.log("Retuned list of clients");
                    return res.status(200).json(clients);
                    break;
            }


        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.newrequest = async (req, res) => {
    data = req.body.body;
    const converted = JSON.parse(data);

    //rules
    if (true) {
        request = await requestController.create(converted, res);
        return res.status(201).json(request);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}
