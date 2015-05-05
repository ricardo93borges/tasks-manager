var tasksManagerServices = angular.module('tasksManagerServices', ['ngResource']);

//Task
tasksManagerServices.factory('Task', function($http){
	var urlBase = 'backend/task/';
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

		update : function (task) {
		    return $http.put(urlBase + 'update/id/' + task.ID, task)
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



/*

angular.module('customersApp')
.factory('dataFactory', ['$http', function($http) {

var urlBase = '/api/customers';
var dataFactory = {};

dataFactory.getCustomers = function () {
    return $http.get(urlBase);
};

dataFactory.getCustomer = function (id) {
    return $http.get(urlBase + '/' + id);
};

dataFactory.insertCustomer = function (cust) {
    return $http.post(urlBase, cust);
};

dataFactory.updateCustomer = function (cust) {
    return $http.put(urlBase + '/' + cust.ID, cust)
};

dataFactory.deleteCustomer = function (id) {
    return $http.delete(urlBase + '/' + id);
};

dataFactory.getOrders = function (id) {
    return $http.get(urlBase + '/' + id + '/orders');
};

return dataFactory;
}]);*/