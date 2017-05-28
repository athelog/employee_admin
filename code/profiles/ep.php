<?php

/*This script is intended to call the edit profiles.html page
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
if(strcmp($Action_Param,'EditCompany')==0){
    $url_array['CompanyID']=$ID_Param;
    echo "<br>url_array[CompanyID]=".$url_array['CompanyID'];
    $IsAllowedToSelectPage=IsAllowedUpdateCompany($_SESSION["UserGroupArray"],$url_array);
    echo "<br>IsAllowedToSelectPage=".$IsAllowedToSelectPage;
    $MaxUserGroup=GetMaxUG(ReadUserGroup($_SESSION['UserID']));
    echo "<br>Session ID=".$_SESSION['UserID'];
    echo "<br>UserGRoup array=";print_r (ReadUserGroup($_SESSION['UserID']));
    echo "<br>Max usergroup=".$MaxUserGroup;
}

//deciding whether it's right to select this patient
if(strcmp($Action_Param,'EditPatient')==0){
    $url_array['PatientID']=$ID_Param;
    $IsAllowedToSelectPage=IsAllowedUpdatePatient($_SESSION["UserGroupArray"],$url_array);
    echo "<br>IsAllowedToSelectPage=".$IsAllowedToSelectPage;
    
}

//choosing which version to select
if($IsAllowedToSelectPage>=1 && strcmp($Action_Param,'EditCompany')==0){
    $pagecontents = file_get_contents("edit_profiles.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);    
}else if($IsAllowedToSelectPage>=1 && strcmp($Action_Param,'EditPatient')==0){
    $pagecontents = file_get_contents("edit_profiles.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);    
}else{
    echo "<br>Redirigiendo a pantalla de acceso no autorizado";    
    header('Location: ' . '../index/message_access_denied.html');     
}





?>   