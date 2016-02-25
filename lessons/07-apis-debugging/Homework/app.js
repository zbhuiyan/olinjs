//npm stuff
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session')
//local
var index = require('./routes/index');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();
var auth = require('./auth');

mongoose.connect(process.env.MONGOURI || 'mongodb://localhost/test'); //ahh

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: 'superS3CRE7',
  resave: false,
  saveUninitialized: false
}));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


//passport
passport.use(new FacebookStrategy({
    clientID: auth.FACEBOOK_APP_ID,
    clientSecret: auth.FACEBOOK_APP_SECRET,
    callbackURL: auth.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //This is not what you want to do here. 
    //Here you should search the connected DB if the user exists and load that in, or add it to db.
    done(null, profile);
  }
));


app.use(passport.initialize());
app.use(passport.session());


//getting
app.get('/', index.login);
app.get('/twotterfd', index.twotterfd);
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/twotter',
                                      failureRedirect: '/' })
);
//posting
app.post('/authenticate', index.authenticate);
app.post('/post', index.post);
app.post('/deleteTwote', index.deleteTwote);


var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});

