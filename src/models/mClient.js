const Sequelize = require('sequelize');
const database = require("./db");

const Client = database.define('Client',
    {
        cpf: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        }
    }
)

module.exports = Client;