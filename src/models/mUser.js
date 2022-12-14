const Sequelize = require('sequelize');
const database = require("./db");

const User = database.define('User',{
    cpfUsers: {
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
    password: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
    },
    user_level: {
        type: Sequelize.INTEGER,
    },
    user_image: {
        type: Sequelize.STRING,
    },
    uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    }
},{ paranoid: true });

module.exports = User;