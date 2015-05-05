<?php 

	include_once '../connection.php';
	
	function select(){
		try{
			$con = connect();
			
			$q = $con->prepare("SELECT 	id, name FROM status");
			$q->execute();
			$records = $q->fetchAll(PDO::FETCH_ASSOC);
			$con = null;
			
			//var_dump($tasks);
			
			$records = convertToJson($records);
			
			echo $records;
			
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
			
			//echo ", jError: ".$jError;
			
			//Bad utf-8 format
			if($jError == 5){
				$res = 	formatCollection($collection);
				$json = json_encode($res);
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
	
	select();
	
?>