
const db = require("../models/db");
const User = require('../models/mUser');

exports.create = async (data, res) => {
    await db.sync();
    response = await User.create({
        cpfUsers: data.cpfUsers,
        name: data.name,
        email: data.email,
        password: data.password,
        status: data.status,
        user_level: data.user_level,
        user_image: data.user_image

    });
    return response;
}

exports.select = async (filters = null, res) => {
    if (filters == null) {
        await db.sync();
        response = await User.findAll();
        return response;
    } else {
        //separate the filters here
        //We can build the filter out of the function and just put in findAll later
        await db.sync();
        response = await User.findAll({
            where: filters
        });
        return response;
    }

}

exports.selectOne = async (filters = null, res) => {
    await db.sync();
    response = await User.findOne({
        where: filters
    });
    return response;
}


exports.update = async (data, res) => {
    const tochange = await User.findByPk(data.cpfUsers);
    tochange.name = data.name ? data.name : tochange.name;
    tochange.email = data.email ? data.email : tochange.email;
    tochange.password = data.password ? data.password : tochange.password;
    tochange.status = data.status ? data.status : tochange.status;
    tochange.user_level = data.user_level ? data.user_level : tochange.user_level;


    response = await tochange.save();

    return response;

}

exports.delete = async (data, res) => {
    return User.destroy({
        where: {
            cpfUsers: data.cpfUsers
        }
    });


}