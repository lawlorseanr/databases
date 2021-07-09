var Users = require('../models/users.js');

module.exports = {
  get: function (req, res) {
    Users.getAll( (err, users) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(users);
      }
    });
  },
  post: function (req, res) {
    Users.create(req.body, (err, success) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(success);
      }
    });
  }
};
