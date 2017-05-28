<?php

/*
 * This file is intended to call the create profile.html page 
 */

include('../engine/session.php');
session_start();

$MaxUserGroup=GetMaxUG(ReadUserGroup($_SESSION['UserID']));
echo "<br>Session ID=".$_SESSION['UserID'];
echo "<br>UserGRoup array=";print_r (ReadUserGroup($_SESSION['UserID']));
echo "<br>Max usergroup=".$MaxUserGroup;

//choosing which version to select
if(strcmp($MaxUserGroup,'developer')==0){
    echo "<br>Loading dev version";
    $pagecontents = file_get_contents("create_profiles.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
}else if(strcmp($MaxUserGroup,'owner')==0){
    echo "<br>Loading owner version";
    $pagecontents = file_get_contents("create_profiles.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
}else if(strcmp($MaxUserGroup,'administrator')==0){
    echo "<br>Loading admin version";
    $pagecontents = file_get_contents("create_profiles.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
}else if(strcmp($MaxUserGroup,'editor')==0){
    echo "<br>Loading editor version";
    $pagecontents = file_get_contents("create_profiles.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
}else if(strcmp($MaxUserGroup,'viewer')==0){
    echo "<br>Loading viewer version";
    echo "<br>Redirigiendo a pantalla de acceso no autorizado";    
    header('Location: ' . '../index/message_access_denied.html'); 
}else if(strcmp($MaxUserGroup,'guest')==0){
    echo "<br>Loading guest version";
    echo "<br>Redirigiendo a pantalla de acceso no autorizado";    
    header('Location: ' . '../index/message_access_denied.html'); 
}else{
    echo "<br>Redirigiendo a pantalla de acceso no autorizado";    
    header('Location: ' . '../index/message_access_denied.html');    
}


?>   