const Sequelize = require('sequelize');
const database = require("./db");

const user = require('./mUser');
const request = require('./mRequest');

const User_has_Request = database.define('User_has_Request', {
    cpfUsers: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: user,
            key: 'cpfUsers'
        }
    },
    idRequests: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: request,
            key: 'idRequests'
        }
    },
});

module.exports = User_has_Request;