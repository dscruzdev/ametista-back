const db = require("../models/db");
const User_has_Language = require('../models/mUser_has_Language');

exports.create = async (data, res) => {
    await db.sync();
    response = await User_has_Language.create({
        cpfUsers: data.cpfUsers,
        idLanguages: data.idLanguages,
        
    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await User_has_Language.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await User_has_Language.findAll({
            where: filters
        });
        return response;
    }

}

exports.update = async (data, res) => {
    const tochange = await User_has_Language.findAll({where: {
        cpfUser: data.cpfUser,
        idLanguage: data.idLanguage
    }});//Rever
    tochange.cpfUser = data.cpfUser ? data.cpfUser : tochange.cpfUser;
    tochange.idLanguage = data.idLanguage ? data.idLanguage : tochange.idLanguage;
    

    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return client.destroy({
        where: {
            cpfUser: data.cpfUser,
            idLanguage: data.idLanguage,
        }
    });


}