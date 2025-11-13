const mysql = require("mysql2");
require("dotenv").config();

// const db = mysql.createConnection({
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   password: process.env.MYSQLPASSWORD,
//   database: process.env.MYSQLDATABASE,
//   port: process.env.MYSQLPORT,
// });

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});


db.connect((err) => {
    if (err) {
        console.error('❌database is not connect:', err);
        return;
    }
    console.log('✅ MySQL database is connect');
});

module.exports = db;

