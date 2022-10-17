const Sequelize = require('sequelize');
const database = require('./db');

const LogStatusRequest = database.define('LogStatusRequest', {
    id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    status:{
        type: Sequelize.STRING,
    },
});

module.exports = LogStatusRequest;