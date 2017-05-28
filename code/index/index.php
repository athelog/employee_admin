<?php
include_once('../engine/session.php');
session_start();


$MaxUserGroup=GetMaxUG(ReadUserGroup($_SESSION['UserID']));
$MyCompanies = ReadLoggedUserCompanies(ReadUserGroup($_SESSION['UserID']));
echo "<br>Session ID=".$_SESSION['UserID'];
echo "<br>UserGroup array=";print_r (ReadUserGroup($_SESSION['UserID']));
echo "<br>Max usergroup=".$MaxUserGroup;
echo "<br>Companies where user=(admin/editor/viewer):";print_r($MyCompanies);


//choosing which version to select
if(strcmp($MaxUserGroup,'developer')==0){
    echo "<br>Loading dev version";
    $pagecontents = file_get_contents("index_dev.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
}else if(strcmp($MaxUserGroup,'owner')==0){
    echo "<br>Loading owner version";
    $pagecontents = file_get_contents("index_owner.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
}else if(strcmp($MaxUserGroup,'administrator')==0){
    echo "<br>Loading admin version";
    $pagecontents = file_get_contents("index_admin.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
}else if(strcmp($MaxUserGroup,'editor')==0){
    echo "<br>Loading editor version";
    $pagecontents = file_get_contents("index_editor.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
}else if(strcmp($MaxUserGroup,'viewer')==0){
    echo "<br>Loading viewer version";
    //$pagecontents = file_get_contents("index_viewer.html");
    //echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
    include_once"index_viewer.php";
    
    
}else if(strcmp($MaxUserGroup,'guest')==0){
    echo "<br>Loading guest version";
    $pagecontents = file_get_contents("index_guest.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
}else{
    echo "<br>Redirigiendo a pantalla de acceso no autorizado";    
    header('Location: ' . '../index/message_access_denied.html');    
}


?>   