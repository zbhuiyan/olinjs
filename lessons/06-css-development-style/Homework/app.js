//npm stuff
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
//local
var index = require('./routes/index');

//connect to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public/favicon', 'favicon.ico')));
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//routing
app.get('/', index.home);
app.get('/login', index.login);

//posting
app.post('/listTwotes', index.listTwotes);
app.post('/post', index.post);
app.post('/listUsers', index.listUsers);


var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});