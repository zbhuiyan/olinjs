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
var app = module.exports = express();

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
  saveUninitialized: false ,
  cookie: {}
}));

//getting
app.get('/', index.login);
app.get('/twotterfd', index.twotterfd);

//posting
app.post('/authenticate', index.authenticate);
app.post('/post', index.post);
app.post('/deleteTwote', index.deleteTwote);


var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});