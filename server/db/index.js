// var mysql = require('mysql');
// // Create a database connection and export it from this file.
// // Confirm that the credentials supplied for the connection are correct.
// var database = mysql.createConnection({
//   user     : 'root',
//   password : '',
//   database : 'chat'
// });

// module.exports = {
//   connect: () => database.connect(),
//   end: () => database.end(),
//   query: query => {
//     return new Promise( (resolve, reject) => {
//       database.query(query, (err, results) => {
//         if (err) {
//           return reject(new Error(err));
//         }
//         resolve(results);
//       });
//     });
//   }
// };

var Sequelize = require('sequelize');

var db = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});


var Message = db.define('Message', {
  campus: Sequelize.STRING,
  roomname: Sequelize.STRING,
  text: Sequelize.STRING,
}, {
  tableName: 'messages'
});

var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  github: Sequelize.STRING
}, {
  tableName: 'users'
});

Message.belongsTo(User);


module.exports = {
  User: User,
  Message: Message
};