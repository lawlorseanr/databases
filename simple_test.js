var mysql = require('mysql');
var _ = require('underscore');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chat'
});

connection.connect();

var username = 'eshi32';
var github = 'bordercollies';
var message = 'another added from simple_test';
var campus = 'hr-lax';
var roomname = 'lobby';

/*
create new message
*/
// connection.query(
//   `INSERT INTO messages (user_id, campus, roomname, content, created_at, updated_at) VALUES ((SELECT id FROM users WHERE username = \'${username}\'), \'${campus}\', \'${roomname}\', \'${message}\', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`,
//   (err, results) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log(results);
//     }
// });
// connection.end();


/*
get all messages
*/
// connection.query(
//   'SELECT messages.id AS message_id, messages.campus, messages.roomname, messages.content AS text, messages.created_at, messages.updated_at, users.username, users.github AS github_handle FROM messages INNER JOIN users ON messages.user_id = users.id;',
//   (err, results) => {
//     if (err) {
//       throw err;
//     } else {
//       _.each(results, result => {
//         console.log(result);
//       });
//     }
// });
// connection.end();


/*
get all users
*/
// connection.query('SELECT username FROM users', function (err, results) {
//   if (err) {
//     throw err;
//   } else {
//     console.log(`Results: ${_.map(results, result => result.username)}`);
//   }
// });
// connection.end();




/*
create new user
*/
// connection.query(
//   `SELECT * FROM users WHERE username IN (\'${username}\')`,
//   (err, results) => {
//     if (err) {
//       connection.end();
//       throw err;
//     } else {
//       if (results.length > 0) {
//         console.log(`User ${username} already exists under id ${results[0].id}.`);
//         connection.end();
//       } else {
//         console.log(`User ${username} does not exist.`);
//         connection.query(
//           `INSERT INTO users (username, github) VALUES (\'${username}\', \'${github}\')`,
//           (err, results) => {
//             if (err) {
//               connection.end();
//               throw err;
//             } else {
//               console.log(`New user ${username} inserted under id ${results.insertId}`);
//               connection.end();
//             }
//           });
//       }
//     }
//   }
// );