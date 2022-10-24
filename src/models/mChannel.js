const Sequelize = require("sequelize");
const database = require('./db');

const Channel = database.define('Channel', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    channel:{
        type: Sequelize.STRING,
    },
});
module.exports = Channel;