const Sequelize = require('sequelize');
const database = require('./db');

const area = require('./mArea');
const user = require('./mUser');

const Area_has_User = database.define('Area_has_User', {
    idAreas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: area,
            key: 'idAreas',
        }
    },
    cpfUsers: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: user,
            key: 'cpfUsers',
        }
    }

});

module.exports = Area_has_User;