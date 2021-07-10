var db = require('../db/index.js');
var Users = require('./users.js');

module.exports = {
  getAll: function (callback) {
    db.query(
      `SELECT
        messages.id AS message_id, messages.campus, messages.roomname, messages.text, messages.createdAt, messages.updatedAt, users.username, users.github AS github_handle
      FROM messages
      INNER JOIN users
      ON messages.UserId = users.id
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
            (UserId, campus, roomname, text, created_at, updated_at)
          VALUES
            (${id}, \'${message.campus}\', \'${message.roomname}\', \'${message.text}\', NOW(), NOW());`)
          .then( results => {
            message.github_handle = message.username;
            message.message_id = results.insertId;
            message.created_at = new Date().toISOString();
            callback(null, message);
          })
          .catch( err => {
            callback(err);
          });
      }
    });
  }
};