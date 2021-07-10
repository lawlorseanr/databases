var db = require('../db/index.js');
var Users = require('./users.js');

module.exports = {
  getAll: function (callback) {
    db.query(
      `SELECT
        messages.id AS message_id, messages.campus, messages.roomname, messages.content AS text, messages.created_at, messages.updated_at, users.username, users.github AS github_handle
      FROM messages
      INNER JOIN users
      ON messages.user_id = users.id
      ORDER BY messages.id
      DESC LIMIT 100;`)
      .then( results => {
        return callback(null, results);
      })
      .catch( err => {
        callback(err);
      });
  },
  create: function (message, callback) {
    var user = {username: message.username, github: message.username};
    Users.create( user, (err, id) => {
      if (err) {
        throw err;
      } else {
        db.query(
          `INSERT INTO
            messages
            (user_id, campus, roomname, content, created_at, updated_at)
          VALUES
            (${id}, \'${message.campus}\', \'${message.roomname}\', \'${message.text}\', NOW(), NOW());`)
          .then( results => {
            message.message_id = results.insertId;
            callback(null, message);
          })
          .catch( err => {
            callback(err);
          });
      }
    });
  }
};