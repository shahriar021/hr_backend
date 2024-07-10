const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   timezone: 'Z',
//   user: 'root',
//   database: 'hr_allowance',
//   port: 3306,
// });

var connection = mysql.createConnection({
  // host: 'localhost',
  host: '198.187.30.101',
  timezone: 'Z',
  port: '3306',
  user: 'urbanit101_allowance',
  database: 'urbanit101_allowance',
  password: 'urb!n@!t!O!_@llO#!**w@nc=e',
});

connection.connect(function (err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database with id ' + connection.threadId);
});

module.exports = connection;
