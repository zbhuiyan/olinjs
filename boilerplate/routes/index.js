var home = function(req, res){
  res.render("home", {"classes": [
     {name:"POE", teacher:"Aaron"},
     {name:"Signals and Systems", teacher:"Allen"},
     {name:"Markanics", teacher:"Mark"}]
   });
};

module.exports.home = home;