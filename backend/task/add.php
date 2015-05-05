<?php 

	include_once '../connection.php';
	
	function getJsonData(){
		$data = json_decode(file_get_contents("php://input"));
		return $data;
	}
	
	function add(){
		
		$task = getJsonData()->task;
		//print_r($task->name);
		
		$status			= $task->status;
		$finished		= isset($task->finished) ? $task->finished : 'null';
		$name 		 	= $task->name;
		$description 	= $task->description;
		$time			= isset($task->time) ? $task->time : 'null';
		$actArray		= isset($task->activities) ? $task->activities : array();
		$observation	= $task->observation;
		$activities		= '';
		
		foreach ($actArray as $a){
			$activities .= $a.';';
		}
		/*
		echo 'status '.   	$status;
		echo ', finished '.  	$finished;
		echo ', name '.   	$name;
		echo ', description '.$description;
		echo ', time '.		$time;
		echo ', atividades '. $activities;
		echo ', observation '.$observation;
		*/
		//die();
		
		try {
			$c = connect();
			//2015-05-05 00:00:00
			//$stat = $c->prepare('INSERT INTO tasks VALUES (null, :status, NOW(), NOW(), :finished, :name, :description, :time, :activities, :observation)');
			$stat = $c->prepare("INSERT INTO tasks VALUES (NULL, :status, NOW(), NOW(), :finished, :name, :description, :time, :atividades, :observation)");
			$stat->bindParam(':status',   		$status);
			$stat->bindParam(':finished',  		$finished);
			$stat->bindParam(':name',   		$name);
			$stat->bindParam(':description',  	$description);
			$stat->bindParam(':time',   		$time);
			$stat->bindParam(':atividades',   	$activities);
			$stat->bindParam(':observation',	$observation);
			$stat->execute();
		
			if($stat->rowCount() == 1){
				echo json_encode(array('status'=>'success', 'message'=>'Task added'));
			}else{
				echo json_encode(array('status'=>'success', 'message'=>'No task added'));
			}
		
			$c = null;
		} catch (Exception $e) {
			$msg = 'Error on add, '.$e->getMessage();
			return json_encode(array('status'=>'error', 'message'=>$msg));
		}
	}
	
	add();
?>