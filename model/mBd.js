var mysql = require('mysql2');
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;

// async function connect() {
//     if (global.connection && global.connection.state !== 'disconnected')
//         return global.connection;

//     const mysql = require("mysql2/promise");
//     const connection = await mysql.createConnection("mysql://" + user + ":" + password + "@" + host + "/" + database);
//     console.log("Conectou no MySQL!");
//     global.connection = connection;
//     return connection;
// }
// async function selectClients(){
//     const conn = await connect();
//     var [rows] = conn.query('SELECT * FROM Client;');
//     return rows;
// }

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
});

// simple query
let selectClients = (connection.query(
    'SELECT * FROM Client',
    function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        return results;
    }
));

console.log(database);