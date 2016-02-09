//order schema -- need mongoose
var mongoose = require('mongoose');


//need customer name, ingredients list, 

var orderSchema = mongoose.Schema({
	customer: String,
	ingredients: Array,
	ingredientString: String
});

//export model as Order in index.js
module.exports = mongoose.model('Order', orderSchema)