const Sequelize = require('sequelize');
const database = require('./db');

const user = require('./mUser');
const request = require('./mRequest');

const Comment = database.define('Comment',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Requests_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: request,
            key: 'id'
        }
    },
    Users_cpf:{
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: user,
            key: 'cpf'
        }
    },
    comment: {
        type: Sequelize.STRING,
    }
});

module.exports = Comment;