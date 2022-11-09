//const Client = require("../model/mClient");
const client = require('../models/mClient');
const db = require("../models/db");
const { Op } = require('sequelize');

exports.create = async (data, res) => {
    await db.sync();
    response = await client.create({
        cpf: data.cpf,
        name: data.name,
        email: data.email,
        phone: data.phone
    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        return response = await client.findAll();
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await client.findAll({
            where: filters

        });


        return response;
    }
}

exports.selectOr = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        return response = await client.findAll();
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await client.findAll({
            where: {[Op.or]: filters.data}

        });


        return response;
    }
}

exports.update = async (data, res) => {
    const tochange = await client.findByPk(data.cpfClients);
    tochange.name = data.name ? data.name : tochange.name;
    tochange.email = data.email ? data.email : tochange.email;
    tochange.phone = data.phone ? data.phone : tochange.phone;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return client.destroy({
        where: {
            cpf: data.cpf
        }
    });


}