//require path, database, 
var cats = {};
var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../fakeDatabase');
//create local vars from db - colors, names, ages
// var colors = db.colors;
// var names = db.names;
// var ages = db.ages;
//create empty object cats
// var namelength = names.length;
// var colorarraylength = colorarray.length;
//function that makes a new cat - random age, name, color

cats.newcat = function(req, res) {
  var names = ['bob', 'tom', 'sel', 'milo', 'beth','ruth','leo','pencil','rum','snowball'];
  var namelength = names.length 
  var catname = names[Math.floor(Math.random() *namelength)];
  var catage = Math.round(Math.random() * (100 - 1) + 1);
  var catColors =[];
  var colorarray = ['red','blue','green','brown','black','yellow','pink'];
  var colorarraylength = colorarray.length
  catColors.push(colorarray[Math.floor(Math.random() * colorarraylength)]);

  //make cat object with the properties
  var catObject = {
    age: catage,
    colors: catColors,
    name: catname
  }
  //newcat var -- render object
  db.add(catObject);
  console.log(db.data);

  res.render("cats", {
    cats: [catObject],
    message: 'You made a new cat'
  })
  
}
//function that lists the cats

cats.list = function(req,res) {
  console.log(db.data);
  res.render("cats", {
    cats:db.data
  })
}

//Remove oldest cat from list, first sort into ascending order
cats.deletecat = function(req, res) {
  var data = db.data;
  function compare(a,b){
    if (a.age < b.age)
      return -1
    else if (a.age > b.age)
      return 1
    else 
      return 0;
  }
  data.sort(compare);

  res.render("cats", {
    cats:cats
  })

}
  
module.exports = cats;
