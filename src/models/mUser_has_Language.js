const Sequelize = require('sequelize');
const database = require('./db.js');

const user = require('./mUser');
const language = require('./mLanguage');

const User_has_Language = database.define('User_has_Language', {
    cpfUsers:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{
            model: user,
            key: 'cpfUsers',
        }
    },
    idLanguages: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: language,
            key: 'idLanguages'
        }
    }
});

module.exports = User_has_Language;