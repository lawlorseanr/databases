var Users = require('../models/users.js');

module.exports = {
  get: function (req, res) {
    Users.getAll( (err, users) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).json(users);
      }
    });
  },
  post: function (username, req, res) {
    Users.create(username, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(201).json('success');
      }
    });
  }
};
