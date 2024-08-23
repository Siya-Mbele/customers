const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_db',
})

mysqlPool.query("SELECT 1")
    .then(() => console.log('db connection succceded.'))
    .catch(err => console.log('db connection failed. \n' + err))

module.exports = mysqlPool