const Sequelize = require('sequelize');
const database = require("./db");
const client = require('./mClient');
const subject = require('./mSubject');
const language = require('./mLanguage');

const Request = database.define('Request', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Client_cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: client,
            key: 'cpf'
        }
    },
    category: {
        type: Sequelize.STRING,
    },
    endedAt: {
        type: 'TIMESTAMP',

    },
    description: {
        type: Sequelize.STRING,

    },
    deadline: {
        type: 'TIMESTAMP'
    },
    priority: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING,

    },
    idLanguage: {
        type: Sequelize.INTEGER,
        references: {
            model: language,
            key: 'id'
        }
    },
    idSubject: {
        type: Sequelize.INTEGER,
        references: {
            model: subject,
            key: 'id'
        }

    }
}, {
    deletedAt: true
})