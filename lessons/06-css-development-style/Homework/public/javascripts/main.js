//clientside - requests pages from server to display to user (client = web browser)

var $loginForm = $('#login-form');
var $user = $('.user');
var $currentUser = $('.current-user-name');
var $currentUserName;
var $currentTwotes;
var $deleteButton = $('#delete-button');

var onSuccess = function(data, status){
  $user = $('.'+data.name);
  $user.remove();
};

var error = function(data, status){
  console.log("Error", data);
};

$deleteButton.click(
  function(){
    $.post('/deleteTwote', $currentUserName)
      .done(onSuccess);
  };
)


$currentUserName =$currentUser.text();

$currentUserName = $currentUserName.substring(0, $currentUserName.length - 1); //assigns name of user
console.log("current user is ", $currentUserName);




//no highlight/fblogstat