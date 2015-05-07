var tasksManagerServices = angular.module('tasksManagerServices', ['ngResource']);

//Task
tasksManagerServices.factory('Task', function($http){
	var urlBase = 'backend/task/';
	return {
		getAll : function () {
		    return $http.get(urlBase+'select.php');
		},
		
		getOne : function (id) {
		    return $http.get(urlBase + 'select.php?id=' + id);
		},

		add : function (task) {
		    return $http.post(urlBase+'add.php', {'task':task});
		},

		update : function (task) {
		    return $http.put(urlBase + 'update.php', task)
		},

		remove : function (id) {
		    return $http.delete(urlBase+'delete.php' + '?id=' + id);
		}
		
	};
});

//Status
tasksManagerServices.factory('Status', function($http){
	var urlBase = 'backend/status/';
	return {
		getAll : function () {
		    return $http.get(urlBase+'select.php');
		},
		
		getOne : function (id) {
		    return $http.get(urlBase + 'select.php/id/' + id);
		},

		add : function (task) {
		    return $http.post(urlBase+'add.php', {'task':task});
		},

		update: function (task) {
		    return $http.put(urlBase + 'update/id/' + task.ID, task)
		},

		remove : function (id) {
		    return $http.delete(urlBase+'delete.php' + '?id=' + id);
		}
		
	};
});