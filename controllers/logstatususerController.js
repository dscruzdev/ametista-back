const db = require("../model/db");
const LogStatusUser = require('../model/mLogStatusUser');

exports.create = async (data, res) => {
    await db.sync();
    response = await LogStatusUser.create({
        status: data.status,
    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await LogStatusUser.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await LogStatusUser.findAll({
            where: {
                'filter.param': 'filter.value' //out of '
            }
        });
        return response;
    }

}

exports.update = async (data, res) => {
    const tochange = await LogStatusUser.findByPk(data.idLogStatus);
    tochange.status = data.status ? data.status : tochange.status;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return client.destroy({
        where: {
            idLogStatus: data.idLogStatus
        }
    });


}