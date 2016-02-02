//require path, database, 
// var cats = {};
var express = require('express');
var router = express.Router();
var path = require('path');
// var db = require('../fakeDatabase');
var Cat = require('../models/catModel.js');
var mongoose = require('mongoose');


function renderCat() {
  var names = ['bob', 'tom', 'sel', 'milo', 'beth','ruth','leo','pencil','rum','snowball'];
  var namelength = names.length 
  var catname = names[Math.floor(Math.random() *namelength)];

  var catage = Math.round(Math.random() * (100 - 1) + 1);

  var catColors =[];
  var colorarray = ['red','blue','green','brown','black','yellow','pink'];
  var colorarraylength = colorarray.length
  catColors.push(colorarray[Math.floor(Math.random() * colorarraylength)]);

  cat = {
    name: catname,
    age: catage,
    color: catColors
  };
  return cat;
}

var newCat = function(req,res){
  var cat = renderCat(); //call this fxn to form a new cat obj
  var newCat = new Cat(cat);
  newCat.save(function(err){
    if (err){
      console.log('Error occurred',err);
    } 
    else {
      console.log('success');
      console.log(cat.color)
      res.render('newcat', cat)
    }
  });
};  

//function that lists the cats

var listCats = function(req,res){
  Cat.find({}, function(err, allCats){
    res.render('cats', {
      message: 'Here are all yo cats',
      cats: allCats
    });
  })
}  

//Remove oldest cat from list, first sort into ascending order
var deleteCat = function(req,res){
  Cat.find({}, function(err, cats){
    if (cats.length === 0) {
      res.render('newcat', {
        name: 'no cats available',
        color: 'no cats',
        age: 'no cats dude'
      });
    }
    else {
      Cat.findOneAndRemove({}, {sort:{age:-1}}, function(err, cat){
        if (err) {
          console.log("Error can't sort/remove first obj", err)
        }
        else {
          res.render('deleteCat', cat);
        }
      })
    };
  });
}  

var groupCat = function (req,res){
  Cat.find({color: 'blue'}, function(err, cats){
    console.log(cats);
    console.log(cats[0].name);
    if (err) {
      console.log('Error, cant find blue cat', err)
    }
    else{
      res.render('groupby', {cats:cats});
    }
  });
}


module.exports.listCats = listCats;
module.exports.deleteCat = deleteCat;
module.exports.newCat = newCat;   
module.exports.groupCat = groupCat;