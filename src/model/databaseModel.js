require('dotenv').config();

var mysql = require('mysql2');

// import and settings for mysql
var connection = mysql.createConnection({
    host     : process.env.APP_HOST,
    user     : process.env.APP_USER,
    password : process.env.APP_PASSWORD,
    database : process.env.APP_DB
});

module.exports= {
    connection
}