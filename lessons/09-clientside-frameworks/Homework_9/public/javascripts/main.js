var toDoApp = angular.module('toDoApp', []);

function mainController($scope, $http) {
  // $scope.formData = {};

  $http.get('api/')
    .success(function(data){
      $scope.toDo = data;
      console.log($scope.toDo)
    })
    .error(function(data){
      console.log('Error:' + data);
    });

  $scope.home = function(){
    $http.post('api/', $scope.formData)
      .success(function(data){
        // $scope.formData = {};
        $scope.toDos = data;
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

  $scope.newToDo = function(){ 
    $scope.toDo.item = {}; 
  }
}


