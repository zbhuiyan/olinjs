//clientside - requests pages from server to display to user (client = web browser)

var $loginForm = $('#login-form');
var $user = $('.user');
var $currentUser = $('.current-user-name');
var $currentUserName;
var $currentTwotes;
var $deleteButton = $('#delete-button');
var $twoteform = $('.twoteform');


var onSuccess = function(data, status){
  console.log('data on success', data);
  var user = 'User: ' + data.user;
  var text = data.text;
  var time = 'Time posted (in ms): ' + data.time;
  var $clone = $('.eachpost').first().clone();
  $clone.find('.text').html(text);
  $clone.find('.user').html(user);
  $clone.find('.time').html(time);
  $('.twotelist').prepend($clone);
};

$twoteform.submit(function(event){
	//grab incoming data from event
	//prevent default action from form, send post
	//request to server, once its successful, onsuccess will make the changes to DOM,
	//as in add a twote


	var $form = $(event.target); //target = the DOM element that initiated the event
	var twote = $form.find('input#twote').val(); //turn DOM element to jQuery obj so we can use jQ methods
	event.preventDefault(); //makes posting twote not work...
	console.log('twoteform', twote);
	var postTwote = {};
	postTwote.text = twote;
	$.post('/post',postTwote).done(onSuccess);


});


$(document).ready(function() {
	$deleteButton.click(function () {
       $.post('/deleteTwote', $currentUserName)
       	.done(onSuccess);

    });
});




var error = function(data, status){
	console.log("Error", data);
};

// $deleteButton.click(
//   function(){
//     $.post('/deleteTwote', $currentUserName)
//       .done(onSuccess);
//   };
// )


$currentUserName =$currentUser.text();

$currentUserName = $currentUserName.substring(0, $currentUserName.length - 1); //assigns name of user
console.log("current user is ", $currentUserName);
