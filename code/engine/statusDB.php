<?php
include("conexionDB.php");
include("getURLparameters.php");

define('DBversion','SELECT VERSION( )');
$query = "NONE";

function ReadGenericParameters(){
	
	global $ActionDB_Param;
	
	
	if (isset($_GET['ActionDBToken'])) {
		$ActionDB_Param=$_GET['ActionDBToken'];
		
		if($ActionDB_Param=="DBversion"){
			DBversionParams(); //Creating Patient Select Query String
		}
        }
}

function DBversionParams() {
		
global $query;
$query = DBversion;
ConexionDB_JSON($query,  $resulttype = MYSQLI_ASSOC);
$value = ConexionDBResult_NumRowAfected($query,  $resulttype = MYSQLI_ASSOC);
}


ReadGenericParameters();
 
 
?>

