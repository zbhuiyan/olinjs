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

//config app
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
app.get('/ingredients', index.ingredients);
app.get('/order', index.order);
app.get('/kitchen', index.kitchen);

//posting
app.post('/fulfilled', index.fulfilled);
app.post('/kitchen', index.kitchen);
app.post('/updateKitchen', index.fulfilled);
app.post('/markOutOfStock', index.markOutOfStock);
app.post('/markInStock', index.markInStock);
app.post('/placeOrder', index.placeOrder);
app.post('/editIngredient', index.editIngredient);
app.post('/addIngredient', index.addIngredient);


app.listen(3000); //whatever is in the environment variable PORT, or 3000 if there's nothing there.


