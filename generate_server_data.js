var _ = require('underscore');
var db = require('./server/db/index.js');
db.connect();


var querySender = query => {
  var start = new Date();
  db.query(query)
    .then( results => {
      console.log(`Query successful after ${new Date() - start}ms.`);
    })
    .catch( err => {
      console.error(err);
    })
    .then( () => db.end() );
};

/*
  =================== Users ===================
 */

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

var query = 'INSERT INTO users (username, github) VALUES';

for (var i = 0; i < usernames.length; i++) {
  var queryText = `(\'${usernames[i][0]}\', \'${usernames[i][1]}\')`;
  query += ' ' + queryText + ', ';
}
query = query.substr(0, query.length - 2);
// querySender(query);



/*
  =================== Messages ===================
 */
var count = 35000;

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
querySender(query);
