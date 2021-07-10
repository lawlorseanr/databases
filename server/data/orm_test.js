var _ = require('underscore');
var data = require('./example_data.js');
var Sequelize = require('sequelize');

var db = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  github: Sequelize.STRING
}, {
  tableName: 'users'
});

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
        return create;
      })
      .catch( err => { throw err; });
  })
  .catch( err => {
    console.error(err);
  })
  .finally( dbUsers => {
    db.close();
  });

Promise.all([userPromise])
  .then( list => {
    console.log(list);
    console.log(new Date() - start);
  });




//   .then(() => {
//     // Now instantiate an object and save it:
//     // return User.create({username: 'jvaljean7', github: 'jeanvaljean'});

//   })
//   .then(() => {
//     // Retrieve objects from the database:
//     return User.findAll({ where: {username: 'jvaljean7'} });
//   })
//   .then( users => {
//     users.forEach(function(user) {
//       console.log(user.username + ' exists');
//     });
//     db.close();
//   })
//   .catch( err => {
//     // Handle any error in the chain
//     console.error(err);
//     db.close();
//   });