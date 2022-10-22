const Sequelize = require('sequelize');
const database = require("./db");

const user = require('./mUser');
const request = require('./mRequest');

const User_has_Request = database.define('User_has_Request', {
    User_cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: user,
            key: 'cpf'
        }
    },
    Request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: request,
            key: 'id'
        }
    },
});

module.exports = User_has_Request;