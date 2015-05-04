<?php 

	include_once 'connection.php';
	
	function delete(){
		$id = $_GET['id'];
		
		try {
			$c = connect();
			$stat = $c->prepare('DELETE FROM tasks WHERE id = :id');
			$stat->bindParam(':id', $id);
			$stat->execute();
			$c = null;
			
			if($stat->rowCount() == 1){
				echo json_encode(array('status'=>'success', 'message'=>'Task deleted'));
			}else{
				echo json_encode(array('status'=>'success', 'message'=>'No task deleted'));
			}
			
		} catch (Exception $e) {
			$msg = 'Error on delete, '.$e->getMessage();
			return json_encode(array('status'=>'error', 'message'=>$msg));
		}
	}
	
	delete();
	
?>