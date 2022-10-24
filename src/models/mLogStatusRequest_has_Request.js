const Sequelize = require('Sequelize');
const database = require('./db');
const logstatus = require('./mLogStatusRequest');
const request = require('./mRequest');

const LogStatusRequest_has_Request = database.define('LogStatusRequest_has_Request', {
    idLogStatus:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: logstatus,
            key: 'id'
        }
    },
    idRequest: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: request,
            key: 'id'
        }
    }
});

module.exports = LogStatusRequest_has_Request;