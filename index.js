require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
//Module allows use of sessions
const session = require('express-session')
// imports passport local strategy
const passport = require('./config/passportConfig');
// module for flash messages
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
// ! this is only used by the session store
const db = require('./models');
const requestUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
const axios = require('axios');
const async = require('async'); 

const app = express();

// ! this line makes the session use sequelize to write session data to a postgres table
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30
})

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());


// Configures express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}));

// use this line once to set up the store table
sessionStore.sync();

// starts the flash middleware
app.use(flash());

// Link passport to the express session
// ! MUST BE BELOW SESSION. this is where we
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

app.get('/', function(req, res) {
    axios.get(requestUrl).then( function(results) {
      let postData = results.data.splice(0,100);
      let storyRequests = postData.map( function(id) {
        return function(callback) {
          let storyUrl = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json'
          axios.get(storyUrl).then( function(results) {
            let story = results.data
            callback(null, {title: story.title, url: story.url});
          })
        }
      })
    async.parallel(async.reflectAll(storyRequests), function(err, results) {
      res.render('index', {stories: results})
    })
  })
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/stories', require('./routes/stories'));
app.use('/user', require('./routes/user'));

var server = app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port....", )
});

module.exports = server;