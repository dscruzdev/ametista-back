const Sequelize = require('sequelize');
const database = require('./db');

const user = require('./mUser');
const request = require('./mRequest');

const Comment = database.define('Comment',{
    idComments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    IdRequests:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: request,
            key: 'idRequests'
        }
    },
    comment: {
        type: Sequelize.STRING,
    }
},{ paranoid: true });

module.exports = Comment;