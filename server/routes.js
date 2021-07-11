var messages = require('./controllers/messages.js');
var users = require('./controllers/users.js');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/messages', messages.get);

router.post('/messages', messages.post);

router.get('/users', users.get);

router.post('/users', users.post);

// router.options('/messages', (req, res, next) => {
//   res.status(200);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//   res.end();
//   next();
// });

module.exports = router;

