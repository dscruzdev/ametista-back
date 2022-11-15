const Sequelize = require('sequelize');
const database = require("./db");

const Client = database.define('Client',
    {
        cpfClients: {
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
        },
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        }
    },{ paranoid: true }
)

module.exports = Client;