var tasksManagerControllers = angular.module('tasksManagerControllers', []);

tasksManagerApp.controller('taskListController', function ($scope, Task) {

	$scope.tasks = [];
	getTasks();
	
	$scope.deleteTask = function(id){
		Task.remove(id)
	        .success(function (response) {
	            getTasks();
	        })
	        .error(function (response) {
	        	//console.log(response);
	        });	
	}
	
	function getTasks(){
        Task.getAll()
            .success(function (response) {
                $scope.tasks = response;
            })
            .error(function (response) {
                $scope.status = 'Unable to load customer data: ' + response.message;
            });
    }

});

tasksManagerApp.controller('taskAddController', function ($scope, $compile, Task, Status) {

	$scope.status = [];
	$scope.activities = [];
	$scope.count = 1;

	getStatus();
	//Get all status
	function getStatus(){
		Status.getAll()
            .success(function (response) {
                $scope.status = response;
            })
            .error(function (response) {
                $scope.status = 'Unable to load customer data: ' + response.message;
            });
    }
	//create activity fragment
	function createFragment(){
		var docfrag = document.createDocumentFragment();
		
		var divRow = document.createElement('div');
		divRow.className = "row collapse postfix-radius";
		divRow.setAttribute("id", "activity_"+$scope.count);
		
		var divInput = document.createElement('div');
		divInput.className = "small-11 columns";
		divInput.innerHTML = '<input ng-keyup="updateActivities('+$scope.count+', activities_'+$scope.count+')" ng-model="activities_'+$scope.count+'" name="activity" type="text" placeholder="Activity"/>'; 
		docfrag.appendChild(divInput);
		
		var divSpan = document.createElement('div');
		divSpan.className = "small-1 columns";
		divSpan.innerHTML = '<span id="remove-activity" class="fa fa-minus postfix right" ng-click="removeActivity('+$scope.count+')" style="padding: 10px 0 10px 0; cursor: pointer;"></span>';
		docfrag.appendChild(divSpan);
		
		divRow.appendChild(divInput);
		divRow.appendChild(divSpan);
		divRow.appendChild(docfrag);
		
		return divRow;
	}
	
	//update activities
	$scope.updateActivities = function(index, value){
		$scope.activities[index] = value;
	}
	
	//update activity fragment
	$scope.addActivity = function(){
		 fragment = createFragment();
		 document.getElementById('activities').appendChild(fragment);
		 $compile(fragment)($scope);
		 $scope.count = $scope.count + 1;
	}
	
	//remove activity
	$scope.removeActivity = function(index){
		fragment = document.getElementById("activity_"+index);
		parent = fragment.parentNode;
		parent.removeChild(fragment);
		$scope.activities.splice(index, 1);
	}
	
	function normalizeActivities(){
		for(var i=0; i < $scope.activities.length; i++){
			if($scope.activities[i] === null || $scope.activities[i] === undefined || $scope.activities[i] === ""){
				$scope.activities.splice(i, 1);
			}
		}
	}
	
	//Insert activity
	$scope.insert = function(task){
		
		normalizeActivities();
		task['activities'] = $scope.activities;
		console.log(task);
		
		Task.add(task)
	        .success(function (response) {
	        	console.log(response);
	        })
	        .error(function (response) {
	        	console.log(response);
	        });
	}
	
});