const db = require("../models/db");
const Area_has_Subject = require('../models/mArea_has_Subject');

exports.create = async (data, res) => {
    await db.sync();
    response = await Area_has_Subject.create({
        idAreas: data.idAreas,
        idSubjects: data.idSubjects,
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
    tochange.idAreas = data.idAreas ? data.idAreas : tochange.idAreas;
    tochange.idSubjects = data.idSubjects ? data.idSubjects : tochange.idSubjects;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    const todelete = {};
    todelete.idAreas = data.idAreas ? data.idAreas : todelete.idAreas;
    todelete.idSubjects = data.idSubjects ? data.idSubjects : todelete.idSubjects;

    Object.keys(todelete).forEach(key =>{
        if (todelete[key] == null || todelete[key] == undefined) {
            delete todelete[key];
        }
    });

    return Area_has_Subject.destroy({
        where: todelete
    });


}