const Sequelize = require('sequelize');
const database = require('./db.js');

const user = require('./mUser');
const language = require('./mLanguage');

const User_has_Language = database.define('User_has_Language', {
    cpfUser:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{
            model: user,
            key: 'cpf',
        }
    },
    idLanguage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: language,
            key: 'id'
        }
    }
});

module.exports = User_has_Language;