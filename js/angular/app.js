var tasksManagerApp = angular.module('tasksManagerApp', ['ngRoute', 'tasksManagerServices', 'tasksManagerDirectives', 'angularUtils.directives.dirPagination']);

tasksManagerApp.config(['$routeProvider', function($routeProvider) {
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
      }]);
