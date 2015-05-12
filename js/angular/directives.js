var tasksManagerDirectives = angular.module('tasksManagerDirectives', ['ngResource']);

tasksManagerDirectives.directive('alert', function($animate){
	return{
		templateUrl: 'directives/alert.html'
	};
});

