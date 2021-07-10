var db = require('../db/index.js');
var _ = require('underscore');

module.exports = {
  getAll: function (callback) {
    db.query('SELECT username FROM users')
      .then( results => {
        var usernames = _.map(results, result => result.username);
        callback(null, usernames);
      })
      .catch( err => {
        callback(err);
      });
  },
  create: function (user, callback) {
    db.query(`SELECT * FROM users WHERE username IN (\'${user.username}\')`)
      .then( results => {
        if (results.length > 0) {
          return callback(null, results[0].id);
        } else {
          db.query(`INSERT INTO users (username, github) VALUES (\'${user.username}\', \'${user.username}\')`)
            .then( (result) => {
              callback(null, result.insertId);
            })
            .catch( err => {
              throw err;
            });
        }
      })
      .catch( err => {
        callback(err);
      });
  }
};