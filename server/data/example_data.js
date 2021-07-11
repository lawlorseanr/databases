var _ = require('underscore');

var data = {
  randItemFrom: items => items[Math.floor(Math.random() * items.length)],
  randomize: (newEntryCount, userList) => {
    var userIds = _.map(userList, value => value[0]);
    var rawMessageData = [];
    for (var i = 0; i < newEntryCount; i++) {
      var user = data.randItemFrom(data.usernames);
      rawMessageData.push([
        data.randItemFrom(userIds), // user_id
        'hr-lax', // campus
        'lobby', // roomname
        [
          data.randItemFrom(data.pronouns),
          data.randItemFrom(data.verbs),
          data.randItemFrom(data.wheres),
          data.randItemFrom(data.whens)
        ].join(' ') // text
      ]);
    }
    return rawMessageData;
  },
  usernames: [
    ['xshi32', 'xuandan08'],
    ['slawlor6', 'lawlorseanr'],
    ['joshhertz', 'jhertz3'],
    ['eshi32', 'bordercollies'],
    ['anonymous', 'lol'],
    ['jyuen8', 'unclejay'],
    ['clawlor', 'saintsforlyfe'],
    ['goouhnyak', 'cvnntg']
  ],
  pronouns: [
    'The President',
    'you',
    'i',
    'we',
    'they',
    'it',
    'the company',
    'Rick & Morty'
  ],
  verbs: [
    'went to ',
    'walked by',
    'flew from',
    'waddled below',
    'skipped along to',
    'did not go to',
    'did nothing at',
    'invented'
  ],
  wheres: [
    'the bar',
    'the albatross',
    'the beach',
    'an abandoned car',
    'someones house'
  ],
  whens: [
    'last year',
    'yesterday',
    'with his guy',
    'a minute ago',
    'when my mom was visiting',
    'with her'
  ]
};

module.exports = data;
