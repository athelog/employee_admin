<?php

include_once ('../engine/FileManagement.php');
include_once('../engine/session.php');

//0. CONST


//1. VARS (don't touch)-----------------
$target_folder = "NONE";
$Action_Param = "NONE";
$ID_Param = "NONE";
$url_array = array();
$IsAllowedToSelectPage=-1;


//2. FUNCT DEF  ------------------------

function UploadFile($targetfile){
    
    $TargetFileType = pathinfo($targetfile,PATHINFO_EXTENSION);
    echo "<br>target_file type=$TargetFileType";
    
    
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
            echo "<br>File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "<br>File is not an image.";
            $uploadOk = 0;
        }
    }
    // Check if file already exists
    if (file_exists($targetfile)) {
        echo "<br>Lo sentimos, el archivo ya existe.";
        $uploadOk = 0;
    }
    // Check file size
    if ($_FILES["fileToUpload"]["size"] > 5000000) {
        echo "<br>Lo sentimos, el archivo es mayor a 5MB.";
        $uploadOk = 0;
    }
    // Allow certain file formats
    //if($imageFileType != "jpg" || $imageFileType != "png" || $imageFileType != "jpeg" || $imageFileType != "gif" ) {
    //    echo "<br>Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    //    $uploadOk = 0;
    //}
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "<br>Lo sentimos, el archivo no pudo ser subido.";
    // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetfile)) {
            echo "<br>The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        } else {
            echo "<br>Lo sentimos, hubo un error al subir el archivo.";
        }
    }    
}
//eof

//3. EXECUTING  ------------------------

session_start();
//echo "<br>Usergroup=".print_r($_SESSION["UserGroupArray"]);



if (isset($_GET['Action'])) {
	$Action_Param=$_GET['Action'];
	echo "<br>Action Param=".$Action_Param;
}	

if (isset($_GET['ID'])) {
	$ID_Param=$_GET['ID'];
	echo ",ID Param=".$ID_Param;
}

//deciding if this file can be uploaded by this user
if(strcmp($Action_Param,'UploadPatientFile')==0){
    $url_array['PatientID']=$ID_Param;
    $IsAllowedToSelectPage=IsAllowedUpdatePatient($_SESSION["UserGroupArray"],$url_array);
    
}

echo "<br>IsAllowedToSelectPage=$IsAllowedToSelectPage";

if (strcmp($Action_Param,"NONE")!=0 && strcmp($ID_Param,"NONE")!=0 && $IsAllowedToSelectPage==1){

    if($Action_Param="UploadPatientFile"){
        $target_folder = $userfiles_basefolder.$ID_Param;
        $uploadOk = 1;//to check if file is well formated, size, etc
        $target_file = $target_folder.'/'.basename($_FILES["fileToUpload"]["name"]);
        
        echo "<br>target_file=$target_file";
        echo "<br>Uploading...";
        UploadFile($target_file);
        
    }else{
        echo "<br>ERROR - parametros de usuario o tipo invalido(s)";
    }
        
        
}else{
    
    echo "<br>ERROR - parametros de usuario o tipo invalido(s)";
    
}


?>   