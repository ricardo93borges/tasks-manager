<?php

function connect(){
	try {
		$host 	= 'localhost';
		$dbname = "tasksmanager";
		$user 	= 'root';
		$passwd = '';
		
	    $con = new PDO('mysql:host='.$host.';dbname='.$dbname, $user, $passwd);
	    return $con;
	    
	} catch (PDOException $e) {
		$msg = 'Conection error, '.$e->getMessage();
		echo json_encode(array('status'=>'error', 'message'=>$msg));
	    die();
	}
}
?>