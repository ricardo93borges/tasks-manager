var tasksManagerServices = angular.module('tasksManagerServices', ['ngResource']);

tasksManagerServices.factory('Task',
    function($resource){
        return $resource('backend/taskList.php', {}, {
            query: {method:'GET', params:{id:'phones'}, isArray:true}
        });
});