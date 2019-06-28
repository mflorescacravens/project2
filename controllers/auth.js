const express = require('express');
const db = require('../models');
const passport = require('../config/passportConfig')
const router = express.Router();

// GET /auth/signup - signup - sends the signup form

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});
// GET /auth/signup - receives the data from that form above
router.post('/signup', function(req,res) {
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      console.log('user was created, not found');
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in!'
      })(req, res);
    } else {
      console.log('email already exists');
      req.flash('error', '❌🆘🚫Email already exists!❌🆘🚫')
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    console.log('error:', error.message);
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

// GET /auth/login - sends the login form
router.get('/login', function(req, res) {
  res.render('auth/login');
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'You have logged in 👍🏼',
  failureFlash: 'Invalid username and/or password! 🔴'
}));

// GET /auth/logout - deletes the session
router.get('/logout', function(req, res) {
  req.logout();
  console.log('logged out');
  req.flash('success', 'You have logged out 👍🏼')
  res.redirect('/');
});

module.exports = router;
