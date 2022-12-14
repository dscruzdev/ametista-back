const Sequelize = require('sequelize');
const database = require('./db');

const Area = database.define('Area', {
    idAreas:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    }
}, { paranoid: true });

module.exports = Area;