const Sequelize = require('sequelize');
const database = require('./db');

const Subject = database.define('Subject', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    }
});

module.exports = Subject;