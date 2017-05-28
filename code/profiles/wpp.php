<?php

/*This script is intended to call the edit watch_profiles_company.html page
 */


include('../engine/session.php');

$ID_Param="NONE";
$Action_Param="NONE";
$url_array = array();
$IsAllowedToSelectPage=-1;

session_start();

echo "<br>Usdergroup=".print_r($_SESSION["UserGroupArray"]);


if (isset($_GET['Action'])) {
	$Action_Param=$_GET['Action'];
	echo "<br>Action Param=".$Action_Param;
}	

if (isset($_GET['ID'])) {
	$ID_Param=$_GET['ID'];
	echo ",ID Param=".$ID_Param;
}


//deciding whether it's right to select this company
if(strcmp($Action_Param,'WatchPatient')==0){
    $url_array['PatientID']=$ID_Param;
    echo "<br>url_array[PatientID]=".$url_array['PatientID'];
    //$IsAllowedToSelectPage=IsAllowedUpdateCompany($_SESSION["UserGroupArray"],$url_array);
    $IsAllowedToSelectPage = 1;
    echo "<br>IsAllowedToSelectPage=".$IsAllowedToSelectPage;
    $MaxUserGroup=GetMaxUG(ReadUserGroup($_SESSION['UserID']));
    echo "<br>Session ID=".$_SESSION['UserID'];
    echo "<br>UserGRoup array=";print_r (ReadUserGroup($_SESSION['UserID']));
    echo "<br>Max usergroup=".$MaxUserGroup;
}

//choosing which version to select
if($IsAllowedToSelectPage>=1 && strcmp($Action_Param,'WatchPatient')==0){
    $pagecontents = file_get_contents("watch_profile_patient.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);    
}else{
    echo "<br>Redirigiendo a pantalla de acceso no autorizado";    
    header('Location: ' . '../index/message_access_denied.html');     
}





?>   