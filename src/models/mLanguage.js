const Sequelize = require("sequelize");
const database = require('./db');

const Language = database.define('Language', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name:{
        type: Sequelize.INTEGER,
    },
});
module.exports = Language;