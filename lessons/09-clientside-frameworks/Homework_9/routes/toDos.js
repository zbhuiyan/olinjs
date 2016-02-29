//Example Wiki - http://language-wikipedia.herokuapp.com/python

var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 

var toDoModel = require('../models/toDoModel');

var ToDo = mongoose.model('toDo', toDoModel.pageSchema);

toDo = {}; 


toDo.home = function(req, res){ 
	//load homepage with list of titles in database
	
	Wiki.find({}, function(err, toDoList){
		if(err){
			res.send(err);
		}
		res.json(toDoList);
	})
	
}


toDo.updateItem = function(req, res){
	
	
	var newItem = req.body.item;
	var id = req.body.id;
	ToDo.update({_id: id}, {new:true}, function(err, updatedObj){
		console.log(updatedObj);
		res.json(updatedObj);			
	})
	
};


toDo.addItem = function(req, res){
	

	var i = new ToDo({item: req.body.item}); 
	i.save(function(err){ 
		if(err){ 
			console.log("Error saving item", err); 
		}
		res.redirect(200, '/api/' + w.header); 
	})
};


module.exports = toDo;