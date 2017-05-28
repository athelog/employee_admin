<?php
include('../engine/session.php');
session_start();

//echo "<br>Session ID=".$_SESSION['UserID'];
//echo "<br>UserGRoup=";print_r (ReadUserGroup($_SESSION['UserID']));
//echo "<br>UG as int=".ReadUserGroup($_SESSION['UserID'])['IntUG'];

//forcing redirect
if(ReadUserGroup($_SESSION['UserID'])['IntUG']<4){
    echo "<br>Redirigiendo a login";    
    header('Location: ' . '../index/login.html');
    
}else{
    //echo "<br>Ejecutando";
    $pagecontents = file_get_contents("ffd_users.html");
    echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents); 
}

?>    
