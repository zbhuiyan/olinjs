//ingredient schema -- need mongoose

var mongoose = require('mongoose');


//name, price and if ingredient is in stock
var ingredientSchema = mongoose.Schema({
	name: String,
	price: Number,
	isinStock: Boolean
});


//export the schema as ingredient in index.js
module.exports = mongoose.model('Ingredient', ingredientSchema); 