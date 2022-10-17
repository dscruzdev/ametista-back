const Sequelize = require('sequelize');
const database = require('./db');
const client = require('./mClient');
const logstatususer = require('./mLogStatusUser');

const LogStatusUser_has_User = database.define('LogStatusUser_has_User', {
    idLogStatus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: logstatususer,
            key: 'idLogStatus'
        }
    },
    User_cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: client,
            key: 'cpf'
        },
    }
});

module.exports = LogStatusUser_has_User