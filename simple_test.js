var mysql = require('mysql');
var _ = require('underscore');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'chat'
});

var count = 5;

var usernames = [
  ['xshi32', 'xuandan08'],
  ['slawlor6', 'lawlorseanr'],
  ['joshhertz', 'jhertz3'],
  ['eshi32', 'bordercollies'],
  ['anonymous', 'lol'],
  ['jyuen8', 'unclejay'],
  ['clawlor', 'saintsforlyfe'],
  ['goouhnyak', 'cvnntg']
];

var pronouns = ['The President', 'you', 'i', 'we', 'they', 'it', 'the company', 'Rick & Morty'];
var verbs = ['went to ', 'walked by', 'flew from', 'waddled below', 'skipped along to', 'did not go to', 'did nothing at', 'invented'];
var wheres = ['the bar', 'the albatross', 'the beach', 'an abandoned car', 'someones house'];
var whens = ['last year', 'yesterday', 'with his guy', 'a minute ago', 'when my mom was visiting', 'with her'];

var randnum = (length) => Math.floor(Math.random() * length);

var query = 'INSERT INTO messages (user_id, campus, roomname, content, created_at, updated_at) VALUES';

for (var i = 0; i < count; i++) {

  var idx = randnum(usernames.length);
  var username = usernames[idx][0];
  var github = usernames[idx][1];
  var campus = 'hr-lax';
  var roomname = 'lobby';

  var message = [
    pronouns[randnum(pronouns.length)],
    verbs[randnum(verbs.length)],
    wheres[randnum(wheres.length)],
    whens[randnum(whens.length)],
  ].join(' ');

  var queryText = `((SELECT id FROM users WHERE username = \'${username}\'), \'${campus}\', \'${roomname}\', \'${message}\', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`;

  query += ' ' + queryText + ', ';

}
query = query.substr(0, query.length - 2);
/*
create new message
  */
var start = new Date();
connection.connect();
connection.query(query, (err, results) => {
  if (err) {
    throw err;
  } else {
    console.log(`\n\nQuery successful. ${count} in ${new Date() - start}ms.`);
  }
});
connection.end();

//| 31213 |       6 | hr-lax | lobby    | the company skipped along to someones house with her             | 2021-07-09 | 2021-07-09 |