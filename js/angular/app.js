var tasksManagerApp = angular.module('tasksManagerApp', ['ngRoute', 'tasksManagerServices']);

tasksManagerApp.config(
		function($routeProvider) {
			$routeProvider.
			when('/tasks', {
				templateUrl: 'partials/task-list.html',
				controller: 'taskListController'
			}).
			when('/tasks/add', {
				templateUrl: 'partials/task-add.html',
				controller: 'taskAddController'
			}).
			otherwise({
				redirectTo: '/tasks'
			});
      });
