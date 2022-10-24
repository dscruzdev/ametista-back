const db = require("../models/db");
const Request = require('../models/mRequest');

exports.create = async (data, res) => {
    await db.sync();
    response = await Request.create({
        idLogStatus: data.idLogStatus,
        User_cpf: data.User_cpf,
    });
    return  response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Request.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Request.findAll({
            where: {
                'filter.param': 'filter.value' //out of '
            }
        });
        return response;
    }

}

exports.update = async (data, res) => {
    const tochange = await Request.findByPk(data.cpf);//Rever
    tochange.idLogStatus = data.idLogStatus ? data.idLogStatus : tochange.idLogStatus;
    tochange.User_cpf = data.User_cpf ? data.User_cpf : tochange.User_cpf;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return client.destroy({
        where: {
            idLogStatus: data.idLogStatus,
            User_cpf: data.User_cpf
        }
    });


}