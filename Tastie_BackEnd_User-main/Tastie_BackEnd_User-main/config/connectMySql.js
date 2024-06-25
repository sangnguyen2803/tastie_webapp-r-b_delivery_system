require("dotenv").config();
const mysql = require('mysql2')

const host = mysql.createPool({
    host : process.env.HOST,
    user : process.env.USER,
    database : process.env.DATABASE,
    password : process.env.PASSWORD
})

module.exports = host.promise();