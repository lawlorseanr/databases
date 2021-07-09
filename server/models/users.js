var db = require('../db/index.js').connection;
var _ = require('underscore');


module.exports = {
  getAll: function (callback) {
    db.connect();
    db.query('SELECT username FROM users', function (err, results) {
      if (err) {
        callback(err);
        db.end();
      } else {
        var usernames = _.map(results, result => result.username);
        callback(null, usernames);
        db.end();
      }
    });

  },
  create: function (username, callback) {
    console.log('inside model');
    db.connect();
    db.query(
      `SELECT * FROM users WHERE username IN (\'${username}\')`,
      (err, results) => {
        if (err) {
          callback(err);
          db.end();
        } else {
          if (results.length > 0) {
            console.log(`User ${username} already exists under id ${results[0].id}.`);
            db.end();
          } else {
            console.log(`User ${username} does not exist.`);
            db.end();
            db.connect();
            db.query(
              `INSERT INTO users (username, github) VALUES (\'${username}\', \'${github}\')`,
              (err, results) => {
                if (err) {
                  callback(err);
                  db.end();
                } else {
                  console.log(`New user ${username} inserted under id ${results.insertId}`);
                  callback(null);
                  db.end();
                }
              });
          }
        }
      }
    );
  }
};
