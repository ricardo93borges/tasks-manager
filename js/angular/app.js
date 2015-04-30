var tasksManagerApp = angular.module('tasksManagerApp', ['ngRoute', 'tasksManagerServices']);

tasksManagerApp.config(
		function($routeProvider) {
			$routeProvider.
			when('/tasks', {
				templateUrl: 'partials/task-list.html',
				controller: 'taskListController'
			}).
			otherwise({
				redirectTo: '/tasks'
			});
      });
