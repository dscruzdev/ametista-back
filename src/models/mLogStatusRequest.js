const Sequelize = require('sequelize');
const database = require('./db');

const LogStatusRequest = database.define('LogStatusRequest', {
    idLogStatusRequests:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    status:{
        type: Sequelize.STRING,
    },
},{ paranoid: true });

module.exports = LogStatusRequest;