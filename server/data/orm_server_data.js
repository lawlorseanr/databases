var _ = require('underscore');
var data = require('./example_data.js');

var randnum = (length) => Math.floor(Math.random() * length);

var generateUsername = true;
if (generateUsername) {
  /*
  =================== Users ===================
  */
  var query = 'INSERT INTO users (username, github) VALUES';
  for (var i = 0; i < data.usernames.length; i++) {
    var queryText = `(\'${data.usernames[i][0]}\', \'${data.usernames[i][1]}\')`;
    query += ' ' + queryText + ', ';
  }
  query = query.substr(0, query.length - 2);
  querySender(query);

} else {
  /*
  =================== Messages ===================
  */
  var count = 35000;
  var query = 'INSERT INTO messages (user_id, campus, roomname, content, created_at, updated_at) VALUES';
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
  querySender(query);
}