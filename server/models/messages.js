var db = require('../db/index.js');
var Users = require('./users.js');
var User = db.User;
var Message = db.Message;
var _ = require('underscore');

module.exports = {
  getAll: function (callback) {
    Message.findAll({limit: 100, include: User})
      .then( results => {
        var processed = _.map(results, result => {
          return {
            message_id: result.id,
            campus: result.campus,
            roomname: result.roomname,
            text: result.text,
            created_at: result.createdAt,
            updated_at: result.updatedAt,
            username: result.User.username,
            github_handle: result.User.github
          };
        });
        callback(null, processed);
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