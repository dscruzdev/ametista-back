const Sequelize = require('sequelize');
const database = require('./db');

const area = require('./mArea');
const user = require('./mUser');

const Area_has_User = database.define('Area_has_User', {
    Area_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: area,
            key: 'id',
        }
    },
    User_cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: user,
            key: 'cpf',
        }
    }

});

module.exports = Area_has_User;