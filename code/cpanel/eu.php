<?php
include('../engine/session.php');

$RowID_Param="NONE";
$ID_Param="NONE";
$Action_Param="NONE";
$url_array = array();
$IsAllowedToSelectPage=-1;

session_start();

echo "<br>Usergroup=".print_r($_SESSION["UserGroupArray"]);


if (isset($_GET['Action'])) {
	$Action_Param=$_GET['Action'];
	echo "<br>Action Param=".$Action_Param;
}	

if (isset($_GET['ID'])) {
	$ID_Param=$_GET['ID'];
	echo ",ID Param=".$ID_Param;
}

if (isset($_GET['RowID'])) {
	$RowID_Param=$_GET['RowID'];
	echo ",RowID Param=".$RowID_Param;
}

//deciding whether it's right to select this company
if(strcmp($Action_Param,'EditUser')==0){
    $url_array['UserID']=$ID_Param;
    $url_array['RowID']=$RowID_Param;
    echo "<br>url_array[UserID],[RowID]=".$url_array['UserID'].",".$url_array['RowID'];;
    $IsAllowedToSelectPage=IsAllowedUpdateUser($_SESSION["UserGroupArray"],$url_array);
    echo "<br>IsAllowedToSelectPage=".$IsAllowedToSelectPage;
    $MaxUserGroup=GetMaxUG(ReadUserGroup($_SESSION['UserID']));
    echo "<br>Session ID=".$_SESSION['UserID'];
    echo "<br>UserGRoup array=";print_r (ReadUserGroup($_SESSION['UserID']));
    echo "<br>Max usergroup=".$MaxUserGroup;
    
    //$IsAllowedToSelectPage=1;
    
}

//choosing which version to select
if($IsAllowedToSelectPage>=1 && strcmp($Action_Param,'EditUser')==0){
    $pagecontents = file_get_contents("edit_users.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);    
}else{
    echo "<br>Redirigiendo a pantalla de acceso no autorizado";    
    header('Location: ' . '../index/message_access_denied.html');     
}





?>   