const db = require("../models/db");
const Area_has_User = require('../models/mArea_has_User');

exports.create = async (data, res) => {
    await db.sync();
    response = await Area_has_User.create({
        idAreas: data.idAreas,
        cpfUsers: data.cpfUsers,
    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Area_has_User.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Area_has_User.findAll({
            where: filters
        });
        return response;
    }

}

exports.update = async (data, res) => {
    const tochange = await Area_has_User.findByPk(data.cpf); //Rever
    tochange.Area_id = data.Area_id ? data.Area_id : tochange.Area_id;
    tochange.User_cpf = data.User_cpf ? data.User_cpf : tochange.User_cpf;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return Area_has_User.destroy({
        where: {
            Area_id: data.Area_id,
            User_cpf: data.User_cpf
        }
    });


}