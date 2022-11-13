const Sequelize = require('sequelize');
const database = require("./db");

const User = database.define('User',{
    cpfUsers: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    },
    user_level: {
        type: Sequelize.INTEGER,
    },
    uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    }
});

module.exports = User;