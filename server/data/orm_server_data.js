var _ = require('underscore');
var data = require('./example_data.js');
var Sequelize = require('sequelize');

var newMessageCount = 35000;

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

var createUsersTable = User.sync();
var createMessagesTable = Message.sync();

Promise.all([
  createUsersTable,
  createMessagesTable
])
  .then( () => {
    /* Instantiate usernames */
    var userData = _.map(data.usernames, user => ({'username': user[0], 'github': user[1]}));
    var userNames = _.map(data.usernames, user => ({'username': user[0]}));

    /* Sequelize comes with built in support for promises
    * making it easy to chain asynchronous operations together */
    var start = new Date();
    var userPromise = User.sync()
      .then( () => {
        return User.findAll({
          where: {
            [Sequelize.Op.or]: userNames
          }
        })
          .then( results => {
            var dbUsers = {};
            _.each(userData, user => {
              dbUsers[user.username] = [undefined, user.github];
            });

            _.each(results, result => {
              dbUsers[result.username] = [result.id, result.github];
            });

            var createUsers = [];
            _.each(dbUsers, (value, user) => {
              if (!value[0]) {
                createUsers.push({username: user, github: value[1]});
              }
            });

            return [dbUsers, createUsers];
          })
          .then( userTypes => {
            let [dbUsers, createUsers] = userTypes;
            return User.bulkCreate(createUsers, {returning: true, ignoreDuplicates: true})
              .then( results => {
                _.each(results, result => {
                  dbUsers[result.username][0] = result.id;
                });
                return dbUsers;
              })
              .catch( err => { throw err; });
          })
          .catch( err => { throw err; });
      })
      .then( (list) => {
        var rawMessages = data.randomize(newMessageCount, list);
        var createMessages = _.map(rawMessages, message => {
          let [UserId, campus, roomname, text] = message;
          return {UserId, campus, roomname, text};
        });
        return Message.bulkCreate(createMessages, {returning: true, ignoreDuplicates: true})
          .then( results => {
            // console.log(results);
          })
          .catch( err => { throw err; });

      })
      .catch( err => {
        console.error(err);
      })
      .finally( () => {
        db.close();
      });
  });

