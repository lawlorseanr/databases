var db = require('../db').connection;
var _ = require('underscore');


module.exports = {
  getAll: function (callback) {
    connection.query('SELECT username FROM users', function (err, results) {
      if (err) {
        throw err;
      } else {
        var usernames = _.map(results, result => result.username);
        callback(usernames);
      }
    });
    connection.end();
  },
  create: function (username, callback) {
    connection.query(
      `SELECT * FROM users WHERE username IN (\'${username}\')`,
      (err, results) => {
        if (err) {
          connection.end();
          throw err;
        } else {
          if (results.length > 0) {
            console.log(`User ${username} already exists under id ${results[0].id}.`);
            connection.end();
          } else {
            console.log(`User ${username} does not exist.`);
            connection.query(
              `INSERT INTO users (username, github) VALUES (\'${username}\', \'${github}\')`,
              (err, results) => {
                if (err) {
                  connection.end();
                  throw err;
                } else {
                  console.log(`New user ${username} inserted under id ${results.insertId}`);
                  connection.end();
                }
              });
          }
        }
      }
    );
  }
};
