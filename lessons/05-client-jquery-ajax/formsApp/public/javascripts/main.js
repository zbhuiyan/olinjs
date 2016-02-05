//Putting all of this together allows us to communicate with the 
//server without sending GET requests from the URL bar and without 
//reloading the page

var $form = $("#ajax-form");

var onSuccess = function(data, status) {
  var img = "<img src='"+data+"'/>";
  $("#result").html(img);
};
//$.get() supplies, uses data returned from server to create a new img
//tag and add it to the page. sets content <div id=result> element 

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};


//event handler - if form raises a submit event then the callback
//fxn will be run with the event obj as parameter
$form.submit(function(event) {
  event.preventDefault(); //stops default action of event
  var mood = $form.find("[name='mood']:checked").val(); //jquery DOM to get values of mood and name
  var name = $form.find("[name='name']").val();
  $.get("getCat", { //calls fxn catCatGet in getCat.js, specified in API
    mood: mood,
    name: name
  })
    .done(onSuccess) //promise interface = allow lots of callbacks in simple easier to read
    .error(onError);
});