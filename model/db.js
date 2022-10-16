const Sequelize = require('sequelize');

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;

const componenteSequelize = new Sequelize(database, user, password,
    {
        dialect: 'mysql', host: host
    });

module.exports = componenteSequelize;