const db = require("../models/db");
const Area_has_Subject = require('../models/mArea_has_Subject');

exports.create = async (data, res) => {
    await db.sync();
    response = await Area_has_Subject.create({
        Area_id: data.Area_id,
        Subject_id: data.Subject_id,
    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Area_has_Subject.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Area_has_Subject.findAll({
            where: {
                'filter.param': 'filter.value' //out of '
            }
        });
        return response;
    }

}

exports.update = async (data, res) => {
    const tochange = await Area_has_Subject.findByPk(data.cpf);//To check
    tochange.Area_id = data.Area_id ? data.Area_id : tochange.Area_id;
    tochange.Subject_id = data.Subject_id ? data.Subject_id : tochange.Subject_id;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return Area_has_Subject.destroy({
        where: {
            Area_id: data.Area_id,
            Subject_id: data.Subject_id,
        }
    });


}