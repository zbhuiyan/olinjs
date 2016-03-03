var mongoose = require('mongoose');
//require both orderModel and ingredientModel files for schemas

var Ingredient = require('./../models/ingredientModel.js');
var Order = require('./../models/orderModel.js');

//route callbacks as in app.js:
var routes = {};

routes.home = function(req,res){
	var message = "Welcome to Burger Land!!!!"
	res.render('message', message);
}

routes.ingredients = function(req,res){	
	//query to find all ingreds from ingredModel
	Ingredient.find({}, function(err, data){
		//Add error handling to all db queries. 
		if (err) {
			res.status(500).send("Error finding ingredients")
		}
		//separate instock/outofstock data
		var inStockData = [];
		var outStockData = [];
		data.forEach(function(d){ //can also use ternary operator
			if (d.inStock){
				console.log('checking in stock');
				inStockData.push(d);}
			else {
				console.log('checking outta stock');
				outStockData.push(d);}
		});
		var packageddata = {'instock': inStockData,'outofstock':outStockData};
	
	//render packageddata to ingredients handlebars
	console.log(packageddata);
	res.render('ingredients',packageddata);
	});
}

routes.order = function(req,res){
	//query find all ingreds 
	Ingredient.find(function(err,data){
		var packageddata = {'ingredients':data};
		res.render('order', packageddata);
	})
}

routes.kitchen = function(req,res){
	//query find all orders
	Order.find(function(err,data){
		var packageddata = {'orders':data};
		//render to kitchen.handlebars
		console.log(packageddata.orders[0].id);
		res.render('kitchen', packageddata);
	});
} 

// routes.updateKitchen = function(req,res){
// 	Order.find(function(err,data){
// 		var packageddata = {'orders':data};
// 		res.render(kitchen, packageddata);
// 	});
// }
routes.fulfilled = function(req,res){
	//ID of order, remove it from Order
	var orderID = req.body.id;
	// var ingredientID = req.body.id;
	console.log('whats')
	Order.findOneAndRemove({'__id':orderID}, function(err, data){
		res.send({orderID: orderID}); //stop processing and return ID
	});
}
routes.markInStock = function(req,res){
	var ingredientID = req.body.id;
	Ingredient.update({'__id':ingredientID}, {'inStock':true}, function(err, data){
		res.end(ingredientID);
	});
}

routes.markOutOfStock = function(req,res){
//get id from request object
	var ingredientID = req.body.id;
	//Model.update(conditions, update, callback)
	Ingredient.update({'__id':ingredientID}, {'inStock':false}, function(err, data){
		res.end(ingredientID);
	});
}

routes.placeOrder = function(req,res){
	//customer name and ingredients -- sort
	var info = req.body; // request body has info
	var ingredients = []; //empty list of ingreds to add to from req
	var customer = 'no name'; // give a default name
	for (key in info) {
		if (key === 'customer'){
			customer = info[key];}
		else {
			ingredients.push(key);
		}
	}
	//package data, save to db
	var packageddata = {'customer':customer,
						'ingredients':ingredients};
	//model, save
	var ordeR = new Order(packageddata);
	var message = 'Order received'
	ordeR.save(function(err,data){
		res.render('message', message);
	});
}

routes.editIngredient = function(req,res){
	//update ingred from req body-- update Ingredient model
	var updatedIngred = req.body;
	//update(conditions, update, callback)
	Ingredient.update({'__id':updatedIngred.id}, updatedIngred, function(err,data){
		res.end(updatedIngred);
	});
}

routes.addIngredient = function(req,res){
	//create ingred and then mark it instock, create it in Ingredient model
	var newIngredient = req.body;
	newIngredient.inStock = true;

	var ingreD = new Ingredient(newIngredient);
}

module.exports = routes;