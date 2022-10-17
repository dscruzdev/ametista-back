const Sequelize = require('sequelize');
const database = require("./db");

const LogStatusUser = database.define('LogStatusUser', {
    idLogStatus:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    status: {
        type: Sequelize.STRING,
    }
});

module.exports = LogStatusUser;