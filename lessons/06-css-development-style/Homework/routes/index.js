//login - db - schema user = model, each has name and list of twotes -array of strs save to db 
//already don't exist.
var express = require('express');
var mongoose = require('mongoose');
//require both orderModel and ingredientModel files for schemas
var Twote = require('./../models/twoteModel.js');
var User = require('./../models/userModel.js');
//route callbacks as in app.js:
var routes = {};

routes.login = function(req,res){
	var message = "Welcome to Twotter! Please log in."
	res.render('home', {message:message});
}


routes.authenticate = function(req, res){
//login type in name -> hit login route -> 
	User.find({name: req.body.name})
		.exec(function(err, userName){
			if (userName.length == 0){
				var user = new User(req.body) 
				req.session.username = user.name;
				user.save(function(err){
					res.redirect('/twotterfd'); //Redirect to trailing “/” when the pathname is a directory.
				}); 
			}else{
				req.session.username = userName[0].name;
				res.redirect('/twotterfd');
			}
		});
}



routes.post = function(req,res){
	//post a twote, disabled/not visible if user isnt logged in
	//include display of logged-in user
	var newTwote = new Twote(req.body);
	newTwote.user = req.session.username;

	var date = new Date();
	var time = date.getTime();
	newTwote.time = time;
	newTwote.save(function(err){
		console.log("Can't add new twote", err);
		res.redirect('twotterfd'); //redirects to feed
	
	});

}

routes.listUsers = function(req,res){
	//list all users, clicking on a user highlights the user's twotes
	return User.find({}, function(err, data){
		if (err) {
			console.log("Can't list users", err);
		}
		res.render('home', data);
	});
} 


routes.deleteTwote = function(req,res){
	Twote.remove({user:req.session.username}, true) 
		.exec(function(err,user){
			var userDelete = {
				name: req.session.username
			}
			res.send(userDelete);
		});
}

routes.twotterfd = function(req,res){
	var twotterusers
	User.find()
		.exec(function(err,twotterusers){
			if (err){
				res.status(500).send(err);
			}else{
				twotterusers = twotterusers;
				Twote.find()
					.sort({'$natural':-1}) //reverse collection scan
					.exec(function(err,twotes){
					if (err){
						res.status(500).send("Twotter feed not working properly", err);
					}else{
						if (req.session.username){
							res.render("twotter", {
								name:req.session.username,
								listUsers: twotterusers,
								twote: twotes
							});
						}else{
							var message = "Please log on"
							res.render("loggedOut", {
								message:message
							});
						}
					}
					});
			}
		});
}



// routes.listTwotes = function(req,res){
// 	//list all twotes (text & author) with most recent at top.
// 	Twote.find({}, function(err, data){
// 		if (err){
// 			console.log("Can't list twotes", err);
// 		}
// 		res.render('home', data);
// 	});
	
// }


module.exports = routes;