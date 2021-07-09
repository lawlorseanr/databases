var Messages = require('../models/messages.js');

module.exports = {
  get: function (req, res) {
    // a function which handles a get request for all messages
    Messages.getAll( (err, messages) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(200).json(messages);
      }
    });
  },
  post: function (req, res) {
    // a function which handles posting a message to the database
    Messages.create(req.body, (err) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(201).send('success');
      }
    });
  }
};
