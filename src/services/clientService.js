const clientController = require("../controllers/clientController");
const fs = require("fs");
const { response } = require("express");

exports.create = async (req, res) => {
    data = req.body;
    //Não pode repetir email
    //Não pode repetir CPF
    //rules
    if (true) {
        client = await clientController.create(data, res);
        client.dataValues.first_name = client.name.split(" ")[0];
        return res.status(201).json(client);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.select = async (req, res) => {
    const { cpf, name, email, phone } = req.body;
    //Somente Admin e atendente acessa aqui

    //rules

    console.log(req.body);

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
        const filter = {
            cpf: cpf ? cpf : null,
            name: name ? name : null,
            email: email ? email : null,
            phone: phone ? phone : null
        };

        Object.keys(filter).forEach(key => {
            if (filter[key] == null) {
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
                    return res.status(200).json(clients);
                    break;
            }


        } else {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
    }
}

exports.update = async (req, res) => {
    //Somente o Admin e atendente
    data = req.body;
    data.cpf = req.params.id;
    //rules
    if (true) {
        client = clientController.update(data, res);
        return res.status(200).json(client);

    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.delete = async (req, res) => {
    data.cpf = req.params.id;
    //Ninguem exclui cliente
    //rules
    if (true) {
        client = await clientController.delete(data, res);
        return res.status(200).json(client);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}