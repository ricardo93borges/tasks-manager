<?php 

	include_once '../connection.php';
	
	function getJsonData(){
		$data = json_decode(file_get_contents("php://input"));
		return $data;
	}
	
	function update(){
		
		$task = getJsonData();
		//print_r($task->name);
		
		$id				= isset($task->id) ? $task->id : 'null';
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
		
		die();
	*/	
		try {
			$c = connect();
			$stat = $c->prepare("UPDATE tasks SET status = :status, finished = :finished, name = :name, description = :description, time = :time, atividades = :atividades, observation = :observation, modified = NOW() WHERE id = :id");
			$stat->bindParam(':status',   		$status, 		PDO::PARAM_INT);
			$stat->bindParam(':finished',  		$finished, 		PDO::PARAM_STR);
			$stat->bindParam(':name',   		$name, 			PDO::PARAM_STR);
			$stat->bindParam(':description',  	$description, 	PDO::PARAM_STR);
			$stat->bindParam(':time',   		$time, 			PDO::PARAM_STR);
			$stat->bindParam(':atividades',   	$activities, 	PDO::PARAM_STR);
			$stat->bindParam(':observation',	$observation, 	PDO::PARAM_STR);
			$stat->bindParam(':id',				$id, 			PDO::PARAM_INT);
			$stat->execute();
			//echo "HERE ".$finished;
			if($stat->rowCount() == 1){
				echo json_encode(array('status'=>'success', 'message'=>'Task updated'));
			}else{
				echo json_encode(array('status'=>'success', 'message'=>'No task updated'));
			}
		
			$c = null;
		} catch (Exception $e) {
			$msg = 'Error on add, '.$e->getMessage();
			return json_encode(array('status'=>'error', 'message'=>$msg));
		}
	}
	
	update();
?>