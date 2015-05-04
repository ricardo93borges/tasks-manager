var tasksManagerControllers = angular.module('tasksManagerControllers', []);

tasksManagerApp.controller('taskListController', function ($scope, Task) {

	$scope.tasks = [];
	getTasks();
	
	$scope.deleteTask = function(id){
		Task.deleteTask(id)
	        .success(function (response) {
	            getTasks();
	        })
	        .error(function (response) {
	        	//console.log(response);
	        });	
	}
	
	function getTasks(){
        Task.getTasks()
            .success(function (response) {
                $scope.tasks = response;
            })
            .error(function (response) {
                $scope.status = 'Unable to load customer data: ' + response.message;
            });
    }

});