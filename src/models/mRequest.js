const Sequelize = require('sequelize');
const database = require("./db");
const client = require('./mClient');
const subject = require('./mSubject');
const language = require('./mLanguage');
const channel = require('./mChannel');

const Request = database.define('Request', {
    idRequests: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cpfClients: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: client,
            key: 'cpfClients'
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
            key: 'idLanguages'
        }
    },
    idSubject: {
        type: Sequelize.INTEGER,
        references: {
            model: subject,
            key: 'idSubjects'
        }

    },
    idChannels: {
        type: Sequelize.INTEGER,
        references: {
            model: channel,
            key: 'idChannels'
        }

    },
    CSAT:{
        type: Sequelize.INTEGER
    },
    CES:{
        type: Sequelize.INTEGER
    },
    NPS:{
        type: Sequelize.INTEGER
    },
    SID:{
        type: Sequelize.STRING
    }
},{ paranoid: true })

module.exports = Request;