var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var exphbs = require("express-handlebars");

var index = require('./routes/index');
var Cat = require("./routes/cats.js");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get("/cats", Cat.listCats);
app.get("/cats/new", Cat.newCat);
app.get("/cats/bycolor/:color", Cat.listCats);
app.get("/cats/delete/old", Cat.deleteCat);
app.listen(3000);




