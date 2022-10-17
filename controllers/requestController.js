const db = require("../model/db");
const Request = require('../model/mRequest');

exports.create = async (data, res) => {
    await db.sync();
    response = await Request.create({
        Client_cpf: data.Client_cpf,
        category: data.category,
        endedAt: data.endedAt,
        description: data.description,
        deadline: data.deadline,
        priority: data.priority,
        status: data.status,
        idLanguage: data.idLanguage,
        idSubject: data.idSubject,
    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Request.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Request.findAll({
            where: {
                'filter.param': 'filter.value' //out of '
            }
        });
        return response;
    }

}

exports.update = async (data, res) => {
    const tochange = await Request.findByPk(data.cpf);
    tochange.category = data.category ? data.category : tochange.category;
    tochange.endedAt = data.endedAt ? data.endedAt : tochange.endedAt;
    tochange.description = data.description ? data.description : tochange.description;
    tochange.deadline = data.deadline ? data.deadline : tochange.deadline;
    tochange.priority = data.priority ? data.priority : tochange.priority;
    tochange.status = data.status ? data.status : tochange.status;
    tochange.idLanguage = data.idLanguage ? data.idLanguage : tochange.idLanguage;
    tochange.idSubject = data.idSubject ? data.idSubject : tochange.idSubject;

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return client.destroy({
        where: {
            id: data.id
        }
    });


}