const Sequelize = require('sequelize');
const database = require('./db');
const user = require('./mUser');
const logstatususer = require('./mLogStatusUser');

const LogStatusUser_has_User = database.define('LogStatusUser_has_User', {
    idLogStatusUser_has_Users: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: logstatususer,
            key: 'idLogStatusUsers'
        }
    },
    cpfUsers: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: user,
            key: 'cpfUsers'
        },
    }
});

module.exports = LogStatusUser_has_User