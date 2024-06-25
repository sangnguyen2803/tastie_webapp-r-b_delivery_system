require("dotenv").config();
const mysql = require('mysql2')



const host = mysql.createPool({
    host : process.env.HOST,
    user : process.env.USER,
    database : process.env.DATABASE,
    password : process.env.PASSWORD
})

// const host = mysql.createPool({
//     host : 'tastie-do-user-11494132-0.b.db.ondigitalocean.com',
//     user : 'doadmin',
//     database : 'Tastie',
//     password : 'AVNS_dIQZdxGNQnKqj_q hide',
//     port : 25060,
//     ssl : 'REQUIRED'
// })

module.exports = host.promise();