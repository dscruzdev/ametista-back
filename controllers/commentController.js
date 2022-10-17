const db = require("../model/db");
const Comment = require('../model/mComment');

exports.create = async (data, res) => {
    await db.sync();
    response = await Comment.create({
        Requests_id: data.Requests_id,
        Users_cpf: data.Users_cpf,
        comment: data.comment,
    });
    return res.status(201).json({ response });
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await Comment.findAll();
        return res.status(200).json(response);
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await Comment.findAll({
            where: {
                'filter.param': 'filter.value' //out of '
            }
        });
        return res.status(200).json(response);
    }

}

exports.update = async (data, res) => {
    const tochange = await Request.findByPk(data.id);
    tochange.Requests_id = data.Requests_id ? data.Requests_id : tochange.Requests_id;
    tochange.Users_cpf = data.Users_cpf ? data.Users_cpf : tochange.Users_cpf;
    tochange.comment = data.comment ? data.comment : tochange.comment;

    response = await tochange.save();

    return res.status(200).json(response);

}

exports.delete = async (data, res) => {
    client.destroy({
        where: {
            id: data.id
        }
    });


}