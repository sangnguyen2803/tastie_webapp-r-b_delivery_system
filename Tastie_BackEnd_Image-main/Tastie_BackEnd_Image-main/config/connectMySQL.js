require("dotenv").config();
const mysql = require('mysql2')



// const host = mysql.createPool({
//     host : process.env.HOST,
//     user : process.env.USER,
//     database : process.env.DATABASE,
//     password : process.env.PASSWORD
// })

const host = mysql.createPool({
    host : 'db-mysql-sgp1-84863-do-user-12377534-0.b.db.ondigitalocean.com',
    user : 'doadmin',
    database : 'Tastie',
    password : 'AVNS_Fy-EpVsCb2lPBuwtaBI',
    port : 25060,
})

module.exports = host.promise();