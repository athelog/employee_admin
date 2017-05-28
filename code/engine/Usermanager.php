<?php

//0. CONST

//base queries
define('LoginUser_BasicQuery', 'SELECT count(*) FROM `Users` WHERE 1 ');
// TODO: define base queries for the other operations

//1. GLOBAL VARS
$ActionDB_Param="NONE";
$UserID_Param="NONE";
$DebugFlag="FALSE";

//$query = "SELECT * from Patients WHERE 1"; //working
$query = "NONE"; //working


//2. FUNCT DEF
// TODO: create more functions for other operations 
// TODO: add more actionDB_Param for other operations
//

//function to login user:
function LoginUserParams() {
		
	global $query;
	$query = LoginUser_BasicQuery;

	if (isset($_GET['UserID_Token'])) {
		$UserID_Param=$_GET['UserID_Token'];
		
		if($UserID_Param!="NONE"){
			$query .= " AND `UserID` = '$UserID_Param'";				
		}
	}
        if (isset($_GET['HashCode_Token'])) {
                $HashCode_Param=$_GET['HashCode_Token'];

                if($HashCode_Param!="NONE"){
                        $query .= " AND `HashCode` = '$HashCode_Param'";				
                }
}
}
function Main(){
	
	global $query, $ActionDB_Param;
	
       
	ReadGenericParameters();	
	
	// $connect = mysqli_connect("mysql.hostinger.es","u505969032_ramvq","joliewatt0123","u505969032_bicoy");
	$connect = mysqli_connect("mysql.hostinger.es","u884088163_erix","L4rd_erix","u884088163_irixs");
	$result = mysqli_query($connect,$query);
	
	$data = array();
        if($ActionDB_Param=="LoginUser"){
           if($result=='[{"0":"1","count(*)":"1"}]')
               {
                print "TRUE";
               }
	} 
	while ($row = mysqli_fetch_array($result)) {
	  $data[] = $row;
	}
    print json_encode($data);
}
//eof

//END OF FUNCT DEF






//--3. Executing script
Main();



?>