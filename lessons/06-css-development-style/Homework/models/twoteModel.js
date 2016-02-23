//ingredient schema -- need mongoose

var mongoose = require('mongoose');


//name, price and if ingredient is in stock
var twoteSchema = mongoose.Schema({
	user: String,
	text: String,
	dateAndTime: Number
});


//export the schema as ingredient in index.js
module.exports = mongoose.model('Twote', twoteSchema); 