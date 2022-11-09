const db = require("../models/db");
const Language = require("../models/mLanguage");
const { Op } = require("sequelize");

exports.create = async (data, res) => {
    await db.sync();
    response = await Language.create({
        name: data.name,

    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Language.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Language.findAll({
            where: {
                filters
            }
        });
        return response;
    }
}

exports.selectOr = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Language.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Language.findAll({
            where: {
                [Op.or]:filters.data
            }
        });
        return response;
    }
}

exports.update = async (data, res) => {
    const tochange = await Language.findByPk(data.id);
    tochange.name = data.name ? data.name : tochange.name;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return Language.destroy({
        where: {
            id: data.id
        }
    });


}