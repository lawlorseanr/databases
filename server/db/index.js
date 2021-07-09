var mysql = require('mysql');

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.

var connection = mysql.createConnection({
  user     : 'root',
  password : '',
  database : 'chat'
});

module.exports.connection = connection;