//should be simple, module.export a home w the diff links
//res render list of links should be within callback function

// var Robot = require('../models/robotModel.js');

module.exports.home = function (req, res){
	res.render("home", {"links":[
		"/cats/new",
		"/cats",
		"cats/bycolor/blue",
		"cats/delete/old"
		]
	});
};

// Robot.find({}, function(err, robots){
//   console.log(robots);
// });
