const db = require("../models/db");
const Logstatusrequest_has_request = require('../models/mLogstatusrequest_has_request');

exports.create = async (data, res) => {
    await db.sync();
    response = await Logstatusrequest_has_request.create({
        idLogStatusRequests: data.idLogStatusRequests,
        idRequests: data.idRequests,

    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Logstatusrequest_has_request.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Logstatusrequest_has_request.findAll({
            where: filters,
        });
        return response;
    }

}

exports.update = async (data, res) => {
    const tochange = await Logstatusrequest_has_request.findByPk(data.cpf);//To check
    tochange.idLogStatus = data.idLogStatus ? data.idLogStatus : tochange.idLogStatus;
    tochange.idLogstatusrequest_has_request = data.idLogstatusrequest_has_request ? data.idLogstatusrequest_has_request : tochange.idLogstatusrequest_has_request;


    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return Logstatusrequest_has_request.destroy({
        where: {
            idLogStatus: data.idLogStatus,
            idLogstatusrequest_has_request: data.idLogstatusrequest_has_request,
        }
    });


}