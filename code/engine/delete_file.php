<?php
ob_start();//to redirect non essential stuff to internal buffers 
/*
 NOTES:
 1-this script wont work correctly if debug echo'es are activated, since they will be included in
 the downloaded file 
  
 
 */


include_once ('../engine/FileManagement.php');
include_once('../engine/session.php');

//0. CONST

//1. VARS (don't touch)-----------------
$target_folder = "NONE";
$Action_Param = "NONE";
$ID_Param = "NONE";
$FileID_Param = "NONE";
$url_array = array();
$IsAllowedToSelectPage=-1;

//2. FUNCT DEF  ------------------------


//
function DownloadFile($file){

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        ob_clean();
        readfile($file);
        //ob_flush();//FIXME: not sure if this is needed after having used ob_clean()
        //flush();
        exit;

}
//eof
//
//3. EXECUTING  ------------------------

session_start();


if (isset($_GET['Action'])) {
	$Action_Param=$_GET['Action'];
	//echo "<br>Action Param=".$Action_Param;
}	

if (isset($_GET['ID'])) {
	$ID_Param=$_GET['ID'];
	//echo ",ID Param=".$ID_Param;
}

if (isset($_GET['FileID'])) {
	$FileID_Param=$_GET['FileID'];
	//echo ",FileID Param=".$FileID_Param;
}

//deciding if this file can be deleted by this user
if(strcmp($Action_Param,'DeletePatientFile')==0){
    $url_array['PatientID']=$ID_Param;
    $IsAllowedToSelectPage=IsAllowedUpdatePatient($_SESSION["UserGroupArray"],$url_array);
    
}

if (strcmp($Action_Param,"NONE")!=0 && strcmp($ID_Param,"NONE")!=0 && strcmp($FileID_Param,"NONE")!=0 && $IsAllowedToSelectPage==1){

    if(strcmp($Action_Param,"DeletePatientFile")==0){
        $target_full_path = $userfiles_basefolder.$ID_Param.'/'.$FileID_Param;
        //echo "<br>full_target_file=.$target_full_path";
        //echo "<br>file_exists?=".file_exists($target_full_file);
        //echo "<br>folder exists?=".is_dir($userfiles_basefolder.$ID_Param);
        //echo "<br>realpath=".realpath($target_full_path); 
        
        //checking that file exists(needs the full path)
        if(file_exists(realpath($target_full_path))){
            
            unlink (realpath($target_full_path));
            
        }else{
            echo '
            <h3>Estimado usuario</h3>
            <p style="color:red">El archivo solicitado no existe:'.$FileID_Param. '</p>
            <a href="../evaluation/attachments.php?Action=UploadPatientFile&ID='.$ID_Param.'">Click en este enlace para retornar a adjuntos</a>';
            
           
        }
        
    }        

    
    
    
    
}else{
    
    //acceso denegado
    echo '
    <h3>Estimado usuario</h3>
    <p style="color:red">Usted no tiene acceso a este archivo</p>
    <a href="../evaluation/attachments.php?Action=UploadPatientFile&ID='.$ID_Param.'">Click en este enlace para retornar a adjuntos</a>';
        
    
}





?>