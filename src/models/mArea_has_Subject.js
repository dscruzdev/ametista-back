const Sequelize = require('sequelize');
const database = require('./db');

const area = require('./mArea');
const subject = require('./mSubject');

const Area_has_Subject = database.define('Area_has_Subject', {
    idAreas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: area,
            key: 'idAreas',
        }
    },
    idSubjects: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: subject,
            key: 'idSubjects',
        }
    }
});

module.exports = Area_has_Subject;