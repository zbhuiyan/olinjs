//ingredient schema -- need mongoose

var mongoose = require('mongoose');


//name, price and if ingredient is in stock
var twoteSchema = mongoose.Schema({
	name: String,
	twotes: Array
});


//export the schema as ingredient in index.js
module.exports = mongoose.model('Twotes', twoteSchema); 