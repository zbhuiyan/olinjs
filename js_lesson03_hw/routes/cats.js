//require path, database, 

var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../fakeDatabase');
//create local vars from db - colors, names, ages
var colors = db.colors;
var names = db.names;
var ages = db.ages;
//create empty object cats
var cats = {};
var namelength = names.length;
var colorarraylength = colorarray.length;
//function that makes a new cat - random age, name, color

cats.new = function(req, res) {

  var catname = names[Math.floor(Math.random() *namelength)];
  var catage = Math.random() * (100 - 1) + 1;
  var catColors =[];
  var colorarray = ['red','blue','green','brown','black','yellow','pink'];
  catColors.push(colorarray[Math.floor(Math.random() * colorarraylength)]);

  //make cat object with the properties
  var catObject = {
    age: catage,
    color: catColors,
    name: catname
  }
  //newcat var -- render object
  
  res.render("cats", {
    cats: [catObject]
  })
  
}
//function that lists the cats
cats.list = function(req,res) {
  res.render("cats", {
    cats:cats
  })
}


cats.delete = function(req, res) {
  cats.pop();
  res.render("cats", {
    cats:cats
  })

}
  
module.exports = cats;
// // create new cat record w age, name, color (generated upon creation)
// router.get('/cats/new', var home = function(req, res, next) {
//   db.add(Cat(name, age, color));
//   res.render("home", {"catQualities": [
//     {name: name},
//       {age: age},
//       {color: color}
//   ]});
   
// });


// //show sorted list of cats by age
// router.get('/cats', function(req, res, next){
//   var cats = db.getAll();
//   var msg = "Cat names by age are: ";

//   res.render('list', msg)
//   cats.forEach(function(getcat){
//     msg = msg + getcat.name + ",";
//   })
//   res.render(getcat, msg);
// });

