const Sequelize = require('sequelize');
const database = require('./db');

const Area = database.define('Area', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    }
});

module.exports = Area;