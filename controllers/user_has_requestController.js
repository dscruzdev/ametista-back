const db = require("../model/db");
const User_has_Request = require('../model/mUser_has_Request');

exports.create = async (data, res) => {
    await db.sync();
    response = await User_has_Request.create({
        User_cpf: data.User_cpf,
        Request_id: data.Request_id,
    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await User_has_Request.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await User_has_Request.findAll({
            where: {
                'filter.param': 'filter.value' //out of '
            }
        });
        return response;
    }

}

exports.update = async (data, res) => {
    const tochange = await User_has_Request.findByPk(data.cpf);//To check
    tochange.User_cpf = data.User_cpf ? data.User_cpf : tochange.User_cpf;
    tochange.Request_id = data.Request_id ? data.Request_id : tochange.Request_id;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return client.destroy({
        where: {
            User_cpf: data.User_cpf,
            Request_id: data.Request_id,
        }
    });


}