<?php
/*
 * File intented to search users to flag them for delete
 */


include('../engine/session.php');
session_start();

$MaxUserGroup=GetMaxUG(ReadUserGroup($_SESSION['UserID']));
$UserGroupArray=ReadUserGroup($_SESSION['UserID']);

echo "<br>Session ID=".$_SESSION['UserID'];
echo "<br>UserGRoup array=";print_r ($UserGroupArray);
echo "<br>Max usergroup=".$MaxUserGroup;

if (isset($_GET['Action']) && isset($_GET['ID'])) {
	$Action_Param=$_GET['Action'];
        $ID_Param=$_GET['ID'];
	echo "<br>Action Param=".$Action_Param;
	echo ",ID Param=".$ID_Param;
        
        //checking that Action parameter is valid
        if(strcmp($Action_Param,'SearchUserWithinSameCompany')!=0){
            echo "<br>Error: Parametro Action invalido. Redirigiendo a pantalla de acceso no autorizado";    
            //header('Location: ' . '../index/message_access_denied.html');             
        }
        
        //checking that user has access to company as editor or admin, or if he's a dev/owner
        else if((!array_key_exists($ID_Param,$UserGroupArray) || (strcmp($UserGroupArray[$ID_Param],"administrator")!=0 &&  strcmp($UserGroupArray[$ID_Param],"editor")!=0  ))&& (strcmp($MaxUserGroup,"owner")!=0 && strcmp($MaxUserGroup,"developer")!=0) ){
            echo "<br>Error: Usuario para esta empresa no esta autorizado=".$UserGroupArray[$ID_Param].". Redirigiendo a pantalla de acceso no autorizado"; 
            //header('Location: ' . '../index/message_access_denied.html');
        }
    
        //all conditions are valid. Redirecting to search page
        else {
            echo "<br>Redirecting to search users within company";
            $pagecontents = file_get_contents("search_ffdu_same_company.html");
            echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);
        }
        
        
}else{
    
    echo "<br>Error: Invalid URL params. Redirecting to error screen";     
    //header('Location: ' . '../index/message_access_denied.html');   
    
}	





//choosing which version to select
//echo "<br>Loading dev version";
//$pagecontents = file_get_contents("search_ffdu_same_company.html");
//echo str_replace("UserID_Tag", $_SESSION['UserID'], $pagecontents);

?>   