var db = require('../db/index.js');

module.exports = {
  getAll: function (callback) {
    // a function which produces all the messages from database
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
    // a function which can be used to insert a message into the database
    db.query(
      `INSERT INTO
        messages
        (user_id, campus, roomname, content, created_at, updated_at)
      VALUES
        ((SELECT id FROM users WHERE username = \'${message.username}\'), \'${message.campus}\', \'${message.roomname}\', \'${message.text}\', NOW(), NOW());`)
      .then( results => {
        return callback(null, results);
      })
      .catch( err => {
        callback(err);
      });
  }
};