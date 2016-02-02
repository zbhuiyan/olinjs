var mongoose = require('mongoose');
var path = require('path');


var catSchema = mongoose.Schema({
	name: String,
	age: Number,
	color: [String]
});


module.exports = mongoose.model('cat', catSchema);
