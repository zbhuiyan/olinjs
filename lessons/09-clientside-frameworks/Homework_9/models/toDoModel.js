var mongoose = require('mongoose'); 

var toDoSchema = mongoose.Schema({ 
	item: String
}); 

module.exports = mongoose.model('toDo',  toDoSchema); 