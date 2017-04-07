var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index.controller');
var passport = require('passport');
var User = require('../models/users');
var LocalStrategy = require('passport-local').Strategy;
var auth=require('../auth');

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/users'
}));

passport.use(new LocalStrategy(
  function (username, password, done) {
    //console.log(username);
    User.getUserByUsername(username, function (err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Unknown User' });
      }

      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    });
  }));


/* GET home page. */
router.get('/',auth.isAuthenticated, function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/login'); 
  });
});



passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



module.exports = router;
