const db = require("../model/db");
const LogStatusRequests = require('../model/mLogStatusRequests');

exports.create = async (data, res) => {
    await db.sync();
    response = await LogStatusRequests.create({
        status: data.status,
    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await LogStatusRequests.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await LogStatusRequests.findAll({
            where: {
                'filter.param': 'filter.value' //out of '
            }
        });
        return response;
    }

}

exports.update = async (data, res) => {
    const tochange = await LogStatusRequests.findByPk(data.id);
    tochange.status = data.status ? data.status : tochange.status

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    LogStatusRequests.destroy({
        where: {
            id: data.id
        }
    });


}