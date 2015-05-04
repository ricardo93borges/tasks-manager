var tasksManagerServices = angular.module('tasksManagerServices', ['ngResource']);

/*
tasksManagerServices.factory('Task',
    function($resource){
        return $resource('backend/taskList.php:id', {id:'id'}, {
            query: {method:'GET', params:{id:'phones'}, isArray:true}
        });
});
*/

tasksManagerServices.factory('Task', function($http){
	var urlBase = 'backend/tasks.php';
	return {
		getTasks : function () {
		    return $http.get(urlBase);
		},
		
		getTask : function (id) {
		    return $http.get(urlBase + '/' + id);
		},

		insertTask : function (task) {
		    return $http.post(urlBase, task);
		},

		updateTask : function (task) {
		    return $http.put(urlBase + '/' + task.ID, task)
		},

		deleteTask : function (id) {
		    return $http.delete('backend/delete.php' + '?id=' + id);
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