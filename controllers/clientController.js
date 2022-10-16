//const Client = require("../model/mClient");
const client = require('../model/mClient');
const db = require("../model/db");

exports.create = async (data, res) => {
    await db.sync();
    response = await client.create({
        cpf: data.cpf,
        name: data.name,
        email: data.email,
        phone: data.phone
    });
    return res.status(201).json({response});
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await client.findAll();
        return res.status(200).json(response);
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await client.findAll({
            where: {
                'filter.param': 'filter.value' //out of '
            }
        });
        return res.status(200).json(response);
    }

}

exports.update = async (data, res) => {
    const tochange = await client.findByPk(data.cpf);
    tochange.name = data.name ? data.name : tochange.name;
    tochange.email = data.email ? data.email : tochange.email;
    tochange.phone = data.phone ? data.phone : tochange.phone;

    response = await tochange.save();

    return res.status(200).json(response);

}