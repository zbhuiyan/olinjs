//login - db - schema user = model, each has name and list of twotes -array of strs save to db 
//already don't exist.

var mongoose = require('mongoose');
//require both orderModel and ingredientModel files for schemas

var Twote = require('./../models/twoteModel.js');

//route callbacks as in app.js:
var routes = {};

routes.home = function(req,res){
	var message = "Welcome to Twotter!"
	res.render('main', message);
}

routes.listTwotes = function(req,res){
	//list all twotes (text & author) with most recent at top.
	Twote.find({}, function(err, data){
		if (err){
			console.log("Can't list twotes", err);
		}
	});
	res.render('twotes', data);
}

// routes.login = function(req, res){
// //login type in name -> hit login route -> 
	
// }


routes.post = function(req,res){
	//post a twote, disabled/not visible if user isnt logged in
	//include display of logged-in user
	var newTwote = new Twote(req.body);
	newTwote.save(function(err){
		if (err){
			console.log("Can't add new twote", err);
		}
	});

}

routes.listUsers = function(req,res){
	//list all users, clicking on a user highlights the user's twotes
	return Twote.find({}, function(err, data){
		if (err) {
			console.log("Can't list users", err);
		}
	});
} 


// routes.logout = function(req,res){
	
// }




module.exports = routes;