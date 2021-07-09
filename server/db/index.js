var mysql = require('mysql');

// Create a database connection and export it from this file.
// Confirm that the credentials supplied for the connection are correct.
var database = mysql.createConnection({
  user     : 'root',
  password : '',
  database : 'chat'
});

module.exports = {
  connect: () => database.connect(),
  end: () => database.end(),
  query: query => {
    return new Promise( (resolve, reject) => {
      database.query(query, (err, results) => {
        if (err) {
          return reject(new Error(err));
        }
        resolve(results);
      });
    });
  }
};