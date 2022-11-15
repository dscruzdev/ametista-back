const Sequelize = require('sequelize');
const database = require("./db");

const LogStatusUser = database.define('LogStatusUser', {
    idLogStatusUsers:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    status: {
        type: Sequelize.STRING,
    }
},{ paranoid: true });

module.exports = LogStatusUser;