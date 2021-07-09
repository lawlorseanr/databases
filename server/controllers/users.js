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
  post: function (req, res) {
    console.log(`body: ${JSON.stringify(req.body)}`);
    Users.create(req.body, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(201).send('success');
      }
    });
  }
};
