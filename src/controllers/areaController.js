const db = require("../models/db");
const Area = require('../models/mArea');

exports.create = async (data, res) => {
    await db.sync();
    response = await Area.create({
        name: data.name,

    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Area.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Area.findAll({
            where: {
                'filter.param': 'filter.value' //out of '
            }
        });
        return response;
    }
}

exports.selectOr = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Subject.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Subject.findAll({
            where: {
                [Op.or]: filters.data
            }
        });
        return response;
    }
}

exports.update = async (data, res) => {
    const tochange = await Area.findByPk(data.idAreas);
    tochange.name = data.name ? data.name : tochange.name;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return Area.destroy({
        where: {
            idAreas: data.idAreas
        }
    });


}