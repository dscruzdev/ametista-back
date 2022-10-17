const Sequelize = require('sequelize');
const database = require('./db');

const area = require('./mArea');
const subject = require('./mSubject');

const Area_has_Subject = database.define('Area_has_Subject', {
    Area_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: area,
            key: 'id',
        }
    },
    Subject_id: {
        Area_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: subject,
                key: 'id',
            }
        }
    }
});

module.exports = Area_has_Subject;