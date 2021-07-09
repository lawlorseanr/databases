var db = require('../db').connection;

module.exports = {
  getAll: function (callback) {
    // a function which produces all the messages from database
    connection.query('SELECT * FROM messages', function (err, results) {
      if (err) {
        throw err;
      } else {
        var usernames = _.map(results, result => result.username);
        // callback(usernames);
      }
    });
  },
  create: function (callback) {
    // a function which can be used to insert a message into the database

  }
};


/*
mysql> SELECT * FROM users;
+----+-----------+---------------+
| id | username  | github        |
+----+-----------+---------------+
|  1 | slawlor6  | lawlorseanr   |
|  2 | xshi32    | xuandan08     |
|  3 | joshhertz | jhertz3       |
|  4 | eshi32    | bordercollies |
+----+-----------+---------------+
4 rows in set (0.00 sec)
*/