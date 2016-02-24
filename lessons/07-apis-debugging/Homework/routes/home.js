var express = require('express');
var mongoose = require('mongoose');

var routes = {};
routes.login = function(req, res){
	var message = "Please log in to Twotter."
	res.render('home', {'message':message});
}




module.exports = routes;