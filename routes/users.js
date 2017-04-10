var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users.controller');
var auth=require('../auth');
/* GET users listing. */

router.get('/',auth.isAuthenticated, usersController.getAll);

router.get('/signup',auth.isAuthenticated, function (req, res, next) {
  res.render('signup', {
    title: 'Sign-up',
    password: '',
    username: '',
    firstname: '',
    lastname: '',
    messages: ''
  });
});

router.post('/signup/post',auth.isAuthenticated, usersController.create);
router.get('/find/:id',auth.isAuthenticated, usersController.getOne);
router.get('/edit/:id',auth.isAuthenticated, usersController.edit);
router.post('/update',auth.isAuthenticated, usersController.update);
router.get('/logs',usersController.logs);

module.exports = router;
