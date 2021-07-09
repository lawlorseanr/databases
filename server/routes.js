var messages = require('./controllers/messages.js');
var users = require('./controllers/users.js');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
router.get('/messages', messages.get);

router.post('/messages', messages.post);

router.get('/users', users.get);

router.post('/users', users.post);


module.exports = router;

