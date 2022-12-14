const { Op } = require("sequelize");
const db = require("../models/db");
const Subject = require('../models/mSubject');

exports.create = async (data, res) => {
    await db.sync();
    response = await Subject.create({
        name: data.name,
        category: data.category,

    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Subject.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Subject.findAll({
            where: filters
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
    const tochange = await Subject.findByPk(data.idSubjects);
    tochange.name = data.name ? data.name : tochange.name;
    tochange.category = data.category ? data.category : tochange.category;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return Subject.destroy({
        where: {
            idSubjects: data.idSubjects
        }
    });


}