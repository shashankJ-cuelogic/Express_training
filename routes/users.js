var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function (req, res, next) {
  res.render('signup', {
    title: 'Sign-up',
    password: '',
    username: '',
    firstname: '',
    lastname: '',
    messages: ''
  });
});

router.post('/signup/post', usersController.create);
router.get('/find/:id', usersController.getOne);

module.exports = router;
