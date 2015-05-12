var tasksManagerControllers = angular.module('tasksManagerControllers', []);

tasksManagerApp.controller('taskIndexController', function ($scope, Task) {

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
                console.log(response.message);
            });
    }

});

tasksManagerApp.controller('taskAddController', function ($scope, $compile, Task, Status, flash) {
	$scope.flash = flash;
	flash.refresh();
	
	$scope.status = [];
	$scope.activities = {};
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
		divInput.innerHTML = '<input ng-model="activities.activity_'+$scope.count+'" name="activity" type="text" placeholder="Activity"/>'; 
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
	
	//add activity fragment
	$scope.addActivity = function(){
		 fragment = createFragment();
		 document.getElementById('activities').appendChild(fragment);
		 $scope.activities["activity_"+$scope.count] = "";
		 $compile(fragment)($scope);
		 $scope.count = $scope.count + 1;
	}
	
	//remove activity
	$scope.removeActivity = function(index){
		fragment = document.getElementById("activity_"+index);
		parent = fragment.parentNode;
		parent.removeChild(fragment);
		$scope.activities["activity_"+index] = '';
		$scope.count--;
	}
	
	function normalizeActivities(){
		for(key in $scope.activities){
			if($scope.activities[key] === null || $scope.activities[key] === undefined || $scope.activities[key] === ""){
				delete $scope.activities[key];
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
	           	flash.setSuccessMessage(response.message);
	        })
	        .error(function (response) {
	           	flash.setErrorMessage(response.message);
	        });
	}
	
});

tasksManagerApp.controller('taskEditController', function ($scope, $compile, $routeParams, Task, Status, flash){
	$scope.flash = flash;
	flash.refresh();

	var id = $routeParams.id;
	
	$scope.task;
	$scope.status;
	$scope.activities = {};
	$scope.count = 0;
	
	getTask(id);
	getStatus();
	
	function setActivities(){
		var act = $scope.task.activities.split(';');

		for(i=0; i < act.length-1; i++){
			 $scope.activities['activity_'+i] = act[i];
			 //$scope.count++;
		}
		
		for(var i in $scope.activities){
			$scope.addActivity();
		}
		
		$scope.removeActivity($scope.count);
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
		$scope.activities["activity_"+index] = '';
		$scope.count--;
	}
	
	//create activity fragment
	function createFragment(){
		var docfrag = document.createDocumentFragment();
		
		var divRow = document.createElement('div');
		divRow.className = "row collapse postfix-radius";
		divRow.setAttribute("id", "activity_"+($scope.count+1));
		
		var divInput = document.createElement('div');
		divInput.className = "small-11 columns";
		divInput.innerHTML = '<input ng-model="activities.activity_'+($scope.count+1)+'" type="text" placeholder="Activity"/>'; 
		docfrag.appendChild(divInput);
		
		var divSpan = document.createElement('div');
		divSpan.className = "small-1 columns";
		divSpan.innerHTML = '<span id="remove-activity" class="fa fa-minus postfix right" ng-click="removeActivity('+($scope.count+1)+')" style="padding: 10px 0 10px 0; cursor: pointer;"></span>';
		docfrag.appendChild(divSpan);
		
		divRow.appendChild(divInput);
		divRow.appendChild(divSpan);
		divRow.appendChild(docfrag);
		
		return divRow;
	}
	
	function normalizeActivities(){
		for(var i=0; i < $scope.activities.length; i++){
			if($scope.activities[i] === null || $scope.activities[i] === undefined || $scope.activities[i] === ""){
				$scope.activities.splice(i, 1);
			}
		}
	}
	
	//Insert activity
	$scope.edit = function(task){
		
		normalizeActivities();
		task['activities'] = $scope.activities;
		console.log(task);
		
		Task.update(task)
	        .success(function (response) {
	        	flash.setSuccessMessage(response.message);
	        })
	        .error(function (response) {
	        	flash.setErrorMessage(response.message);
	        });
	}
	
	$scope.deleteTask = function(id){
		Task.remove(id)
	        .success(function (response) {
	            getTasks();
	        })
	        .error(function (response) {
	        	console.log(response);
	        });	
	}
	
	function getTask(id){
        Task.getOne(id)
            .success(function (response) {
            	if(response[0] instanceof  Array){
            		$scope.task = response[0];
            	}else{
            		$scope.task = response;
            	}
            	setActivities();
            })
            .error(function (response) {
                console.log(response.message);
            });
    }
	
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
		
});

tasksManagerApp.controller('taskViewController', function ($scope, $routeParams, Task, Status) {
	var id = $routeParams.id;
	
	$scope.task;
	$scope.status;
	getTask(id);
	getStatus();
	
	$scope.deleteTask = function(id){
		Task.remove(id)
	        .success(function (response) {
	            getTasks();
	        })
	        .error(function (response) {
	        	console.log(response);
	        });	
	}
	
	function getTask(id){
        Task.getOne(id)
            .success(function (response) {
            	$scope.task = response;
            		
            })
            .error(function (response) {
                console.log(response.message);
            });
    }
	
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
});