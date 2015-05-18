<?php 

	include_once '../connection.php';
	
	function getJsonData(){
		$data = json_decode(file_get_contents("php://input"));
		return $data;
	}
	
	function setConditions($status, $created_start, $created_end, $finished_start, $finished_end){
		if(!$status && !$created_start && !$created_end && !$finished_start && !$finished_end){
			return false;
		}
		
		$conditions = array();
		$where = " WHERE ";
		if($status){
			if($status == "All"){
				$conditions[] = "t.status <> '$status'";
			}else{
				$conditions[] = "t.status = $status";
			}
		}
		if($created_start){
			$conditions[] = "t.created >= '$created_start'";
		}
		if($created_end){
			$conditions[] = "t.created <= '$created_end'";
		}
		if($finished_start){
			$conditions[] = "t.finished <= '$finished_start'";
		}
		if($finished_end){
			$conditions[] = "t.finished <= '$finished_end'";
		}
			
		$first = false;
		foreach($conditions as $c){
			$prefix = $first ? ' AND ' : '';
			$where .= $prefix.$c;
			$first = true;
		}
		
		return $where;
	}
	
	function filter(){
		$task = getJsonData();
		
		$status			= isset($task->status) 			? $task->status 		: null;
		$created_start	= isset($task->created_start) 	? $task->created_start 	: null;
		$created_end	= isset($task->created_end)   	? $task->created_end 	: null;
		$finished_start	= isset($task->finished_start) 	? $task->finished_start : null;
		$finished_end	= isset($task->finished_end)   	? $task->finished_end 	: null;
		
		
		$where = setConditions($status, $created_start, $created_end, $finished_start, $finished_end);
		//die(json_encode($where));
		
		try{
			$con = connect();
			
			if(!$where){
				die(json_encode(array('status'=>'error', 'message'=>'No params')));
			}
			
			$q = $con->prepare("SELECT 	t.id, t.status, t.created, t.modified, t.finished, t.name, 
										t.description, t.time, t.activities, t.observation, 
										s.id as statusId, s.name as statusName 
								 		FROM tasks t join status s on t.status = s.id".$where);
		
			$q->execute();
			$tasks = $q->fetchAll(PDO::FETCH_ASSOC);
			$con = null;
			
			
			$tasks = convertToJson($tasks);
			//json_encode(print_r($tasks));
			echo $tasks;
			
		}catch (PDOException $e){
			$msg = 'Query error, '.$e->getMessage();
			echo json_encode(array('status'=>'error', 'message'=>$msg));
		}
	}
	
	/*
	 * @param $collection = expect an array of arrays
	 */
	function convertToJson($collection){
		try{
			
			$json 	= json_encode($collection);
			$jError = json_last_error();
			
			if(isset($_GET['id'])){
				$json 	= json_encode($collection[0]);
			}
			//echo ", jError: ".$jError;
			
			//Bad utf-8 format
			if($jError == 5){
				$res = 	formatCollection($collection);
				$json = json_encode($res);

				if(isset($_GET['id'])){
					$json 	= json_encode($res[0]);
				}
			}
			
			return $json;
		}catch (Exception $e){
			$msg = 'Error on convert to json, '.$e->getMessage();
			return json_encode(array('status'=>'error', 'message'=>$msg));
		}
	}
	
	/*
	 * @param $collection = expect an array of arrays
	 */
	function formatCollection($collection){
		try {
			//echo ", Formating..<br/>";
			$formatedCollection = array();
			
			foreach ($collection as $c){
				$arr = array();
				foreach ($c as $k=>$v){
					$arr[$k] = iconv('UTF-8', 'UTF-8//IGNORE', utf8_encode($c[$k]));
				}
				$formatedCollection[] = $arr;
			}
			//var_dump($formatedCollection);
			return $formatedCollection;
		}catch (Exception $e){
			$msg = 'Error on format collection, '.$e->getMessage();
			return json_encode(array('status'=>'error', 'message'=>$msg));
		} 
	}
	
	function delete(){
		$id = $_POST['id'];
		
		try {
			$c = getConnection();
			$stat = $c->prepare('DELETE FROM tasks WHERE id = :id');
			$stat->bindParam(':id', $id);
			$stat->execute();
			$c = null;
			echo json_encode(array('return'=>'true', 'message'=>'Arquivo deletado'));
		} catch (Exception $e) {
			$msg = 'Error on delete, '.$e->getMessage();
			return json_encode(array('status'=>'error', 'message'=>$msg));
		}
	}
	
	filter();
	
?>