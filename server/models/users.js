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
    db.query(`SELECT * FROM users WHERE username IN (\'${user}\')`)
      .then( results => {
        if (results.length > 0) {
          callback('User already defined');
        }
        return;
      })
      .then( () => {
        db.query(`INSERT INTO users (username, github) VALUES (\'${user.username}\', \'${user.github}\')`)
          .catch( err => {
            callback(err);
          });
      })
      .catch( err => {
        console.error(err);
        callback(err);
      });
  }
};
//       data: {todoText: text},