const Sequelize = require("sequelize");
const database = require('./db');

const Channel = database.define('Channel', {
    idChannels:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    channel:{
        type: Sequelize.STRING,
    },
},{ paranoid: true });
module.exports = Channel;