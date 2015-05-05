var tasksManagerApp = angular.module('tasksManagerApp', ['ngRoute', 'tasksManagerServices']);

tasksManagerApp.config(
		function($routeProvider) {
			$routeProvider.
			when('/tasks', {
				templateUrl: 'partials/task/index.html',
				controller: 'taskIndexController'
			}).
			when('/tasks/add', {
				templateUrl: 'partials/task/add.html',
				controller: 'taskAddController'
			}).
			when('/tasks/edit/:id', {
				templateUrl: 'partials/task/edit.html',
				controller: 'taskEditController'
			}).
			when('/tasks/view/:id', {
				templateUrl: 'partials/task/view.html',
				controller: 'taskViewController'
			}).
			otherwise({
				redirectTo: '/tasks'
			});
      });
