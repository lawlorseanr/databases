var _ = require('underscore');
var db = require('../db/index.js');
var data = require('./example_data.js');

var query = 'INSERT INTO messages (user_id, campus, roomname, content, created_at, updated_at) VALUES';

var randnum = (length) => Math.floor(Math.random() * length);

var count = 5;
for (var i = 0; i < count; i++) {

  var idx = randnum(data.usernames.length);
  var username = data.usernames[idx][0];
  var github = data.usernames[idx][1];
  var campus = 'hr-lax';
  var roomname = 'lobby';

  var message = [
    data.pronouns[randnum(data.pronouns.length)],
    data.verbs[randnum(data.verbs.length)],
    data.wheres[randnum(data.wheres.length)],
    data.whens[randnum(data.whens.length)],
  ].join(' ');

  var queryText = `((SELECT id FROM users WHERE username = \'${username}\'), \'${campus}\', \'${roomname}\', \'${message}\', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`;

  query += ' ' + queryText + ', ';

}
query = query.substr(0, query.length - 2);
/*
create new message
  */
var start = new Date();
db.connect();
db.query(query)
  .then( results => {
    console.log(`\n\nQuery successful. ${count} results added in ${new Date() - start}ms.`);
  })
  .catch( err => {
    console.error(err);
  })
  .then( () => db.end() );
