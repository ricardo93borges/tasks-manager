var tasksManagerControllers = angular.module('tasksManagerControllers', []);

tasksManagerApp.controller('taskListController', function ($scope, Task) {
	  $scope.tasks = Task.query();
	});


