<?php

include_once('../engine/session.php');
include_once('../engine/usergroupdef.php'); 

//0. VAR READ

$userfiles_basefolder = "../../userfiles/"; //FIXME: read this from XML

//1. FUNCTION DEFINITION --------

//1.1 Function to create new user folder
function CreateFolder($foldername){
    
    echo "<br>CreateFolder() - starting execution";
    
    if(!is_dir($foldername)){
        echo "<br>Creating folder";
        mkdir($foldername);
        
    }else{
        echo "<br>ERROR:Folder folder - already exists!";
    }
    
}
//eof CreateFolder

//----END OF FUNCTION DEFINITION -



//function to recursively read all folder and files
//print_files=true => prints out the links to access the files over the internet explorer
function foldersize($path,$enable_print_filenames,$enable_file_download_links, $enable_delete_links=FALSE,$enable_print_foldersize=FALSE) {
    
    global $ID_Param;
    
    $total_size = 0;
    $files = scandir($path);
    $cleanPath = rtrim($path, '/'). '/';

    foreach($files as $t) {
        
        //reading size
        if ($t<>"." && $t<>"..") {
            $currentFile = $cleanPath . $t;
            
            
            
            //printing file links for direct internt explorer access
            if(!is_dir($currentFile) && $enable_print_filenames) echo "<br>".basename($currentFile);           
            
            //for download thru php function (hiding the links)
            if(!is_dir($currentFile) && $enable_file_download_links){
                
                $alias = basename($currentFile);//to prevent revealing the path of files :)
                echo " <a href='../engine/download_file.php?Action=DownloadPatientFile&ID=$ID_Param&FileID=$alias'>Descargar</a>";
               
            }
            
            if(!is_dir($currentFile) && $enable_delete_links){
                
                $alias_delete = basename($currentFile);//to prevent revealing the path of files :)
                echo " <a href='../engine/delete_file.php?Action=DeletePatientFile&ID=$ID_Param&FileID=$alias_delete'>Borrar</a>";                
                
            }
            
            
            if (is_dir($currentFile)) {
                $size = foldersize($currentFile,$print_files,false);
                $total_size += $size;
                
                if($enable_print_foldersize)echo "<br>$currentFile, Tamano=".round($size/(1024*1024),2)." MB ";
               
            }
            else {
                $size = filesize($currentFile);
                //echo " size=$size Bytes";
                $total_size += $size;
            }
        } 
        

        
        
    }

    
    return $total_size;
}
//eof


//function to format size of files to MB(megabytes)
function format_size($size) {
    global $units;

    $mod = 1024;

    for ($i = 0; $size > $mod; $i++) {
        $size /= $mod;
    }

    $endIndex = strpos($size, ".")+3;

    return substr( $size, 0, $endIndex).' '.$units[$i];
}
//eof




//copies from php spanish reference
//http://php.net/manual/es/function.fileperms.php
function ReadPermissions($filename){

$permisos = fileperms($filename);

switch ($perms & 0xF000) {
    case 0xC000: // Socket
        $info = 's';
        break;
    case 0xA000: // Enlace simbólico
        $info = 'l';
        break;
    case 0x8000: // Normal
        $info = 'r';
        break;
    case 0x6000: // Bloque especial
        $info = 'b';
        break;
    case 0x4000: // Directorio
        $info = 'd';
        break;
    case 0x2000: // Carácter especial
        $info = 'c';
        break;
    case 0x1000: // Tubería FIFO pipe
        $info = 'p';
        break;
    default: // Desconocido
        $info = 'u';
}

// Propietario
$info .= (($permisos & 0x0100) ? 'r' : '-');
$info .= (($permisos & 0x0080) ? 'w' : '-');
$info .= (($permisos & 0x0040) ?
            (($permisos & 0x0800) ? 's' : 'x' ) :
            (($permisos & 0x0800) ? 'S' : '-'));

// Grupo
$info .= (($permisos & 0x0020) ? 'r' : '-');
$info .= (($permisos & 0x0010) ? 'w' : '-');
$info .= (($permisos & 0x0008) ?
            (($permisos & 0x0400) ? 's' : 'x' ) :
            (($permisos & 0x0400) ? 'S' : '-'));

// Mundo
$info .= (($permisos & 0x0004) ? 'r' : '-');
$info .= (($permisos & 0x0002) ? 'w' : '-');
$info .= (($permisos & 0x0001) ?
            (($permisos & 0x0200) ? 't' : 'x' ) :
            (($permisos & 0x0200) ? 'T' : '-'));

echo $info;
}

//testing
//CreateFolder("111610819");

    //$units = explode(' ', 'B KB MB GB TB PB');
    //$SIZE_LIMIT = 5368709120; // 5 GB
    //$disk_used = foldersize("../cpanel/");
    //$disk_used = foldersize("./");
    //$disk_used = foldersize("../../userfiles/",false,false);
    
    //$disk_remaining = $SIZE_LIMIT - $disk_used;

    //echo("<html><body>");
    //echo('<br>diskspace used: ' . format_size($disk_used) . '<br>');
    //echo( '<br>diskspace left: ' . format_size($disk_remaining) . '<br><hr>');
    //echo("</body></html>");

    //echo "<br><br>folder permissions=".ReadPermissions("../../userfiles/");
    //echo "<br><br>folder owner=".fileowner("../../userfiles/"); 
    //chmod("../../userfiles/",0777);
    //echo "<br><br>new permissions=".ReadPermissions("../../userfiles/");
    //echo "<br>Creating new folder=".CreateFolder($userfiles_basefolder.'/'.'111610825');
    
    //echo "<script>window.close();</script>";
    ///echo "<script>window.close();</script>";
    //echo '<script type="text/javascript">window.close();</script>';
?>