var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.controller');

/* GET users listing. */

router.get('/', usersController.getAll);

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
router.get('/edit/:id', usersController.edit);
router.post('/update', usersController.update);


module.exports = router;
