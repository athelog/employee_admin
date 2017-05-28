<?php

include("DBArrayQuery.php");
include_once "conexionDB.php";
include_once "usergroupdef.php";

//store roles 
$UserGroupAsInt = array(
    "NONE" => 0,
    "guest" => 1,
    "viewer" => 2,
    "editor" => 3,
    "administrator"=>4,
    "owner"=>5,
    "developer"=>6,
    "technician"=>-1,
); 


//FUNCTION DEF
function SessionStart($userid){
    
    //session_name($UserID);
    session_start();
    $_SESSION["UserID"] = $userid;
    $_SESSION["UserGroupArray"]=array();
    $_SESSION["UserGroupArray"]=ReadUserGroup($userid);
    
    
    //print "<br>\nSession user=". $_SESSION["UserID"];
    //print "<br>\nUserGroupArray=". print_r($_SESSION["UserGroupArray"]);    

}

function PrintSessionInfo(){
    
    //print "<br>\nSession user=". $_SESSION['UserID'];
    //print "<br>\nSession date=". $_SESSION['Date'];
    
}


function SessionDestroy(){
    
    session_start();
    session_unset();
    session_destroy();
    echo "<br> Dstroying session";
}

//function to return UserGroup numerical value for logged UserID
//returns array = $key=>$value, $Company => $UserGroup
function ReadUserGroup($userid){
    
    global $UserGroupAsInt;
    $result = "NONE";
    $query = "SELECT CompanyID, UserGroup FROM Users WHERE";
    $query.= " UserID='".$userid."'";
    //echo "<br>query=".$query;
    $rawdB_result=ConexionDB_rawdata($query);//result of query
    
    
    //echo "<br>Result full Raw=".print_r($rawdB_result);//full result
    
    /*
    $string_res = $rawdB_result[0]['UserGroup']; //echo "<br>Executing ReadUserGroup, string res=".$string_res;
    $int_res = $UserGroupAsInt[$string_res]; //echo "<br>Executing ReadUserGroup, int_res=".$int_res;
  
    echo "<br>int res=".$UserGroupAsInt["Editor"];
    
    $result=array(            
        "StringUG"=> $string_res,
        "IntUG" => $int_res,
            
    );
     
     */
    
    $permissions_array=array();
    //echo "<br>Content of full array=";
    foreach($rawdB_result as $key=>$value) {
        
        //echo "<br>key,value=";
        //print_r($key).",".print_r($value);
        
        //echo "$key".",".echo "$value";
        
        foreach($value as $key2=>$val2){
            
            if(strcmp($key2,"CompanyID")==0){
                
                //echo "<br>Key CompanyID detected. (Key, value)=(".$key2.",".$val2.")";
                //echo "<br>Pair:(CompanyID,UserGroup )=(".$value['CompanyID'].",".$value['UserGroup'].")";
                $permissions_array[$value['CompanyID']]=$value['UserGroup'];
            }
            
        }
    

        
    }
    
    //printing final permission array
    //echo "<br><br>Permission array final version";
    //print_r($permissions_array);
   
    return $permissions_array;//returning UserGroup
    
}
//eof ReadUserGroup


//function to read the list of companies ids where the logged users is viewer/editor/admin/
//params array in format $key=>$value, $Company => $UserGroup
function ReadLoggedUserCompanies($permission_array,$encode_Json=false){
    
    $value=array();    

    //checking if $permission_array is an array
    if(is_array($permission_array)){
        
        //echo "<br>ReadLoggedUserCompanies() - parameter=".print_r($permission_array);
        
        foreach($permission_array as $key=>$val){
            //echo "<br>Reading usergroup=$val";
            if(strcmp($val,"editor")==0 || strcmp($val,"administrator")==0 || strcmp($val,"viewer")==0 ){
                //echo "<br>Usergroup matched=$val. Adding to outpout array";
                array_push($value,$key);//adding company to array
                //print_r($value);
            }
        }
        
        //echo "<br>ReadLoggedUserCompanies(). Returning array=".print_r($value);
        if($encode_Json==false)return  $value;
        else return ConexionDB_JSON($value);

        
    }else{
        //parameter is not array. Returning NONE
        //echo "<br>ReadLoggedUserCompanies() - parameter is not an array. Finishing";
        if($encode_Json==false)return  $value;
        else return ConexionDB_JSON($value);
    
    }
    
}
//eof


//--function to check permissions
//UG: usergroup of the user current logged in
/* Returning: 

-1:user not allowed

*/


//function to check if $userid can modify $target
//criteria: $userid > $target and also checks if belong to same company
//return -1 if not possible or 1 if possible
function CanUserModifyUser($userid,$target){
    
    global $user2target_array;
    
    echo "<br>CanUserModifyUser($userid,$target)";
    
    $user_array=ReadUserGroup($userid);//read userid company/roles
    //print "<br>user_array=".print_r($user_array);
    
    $target_array=ReadUserGroup($target);//read target company/roles
    //print "<br>target_array=".print_r($target_array);
   
    foreach($user_array as $key=>$val){

            foreach($target_array as $key2=>$val2){

                    //checking interception of companies
                    if(strcmp($key,$key2)==0){

                            echo "<br>Company intersection detected=".$key.",".$key2;
                            echo "<br>Usergroups(userid,target)="."($user_array[$key],$target_array[$key2])";
                            $result=call_user_func($user2target_array[$user_array[$key]], $target_array[$key2]);
                            echo "<br>Result=".$result;
                            return $result;
                    }else{

                            echo "<br>There is no company intersection";
                            return -1;
                    }    

            }


    }

    
}
//eof



//testing
//print_r ($array);
//$j='ojo';
//echo "<br>array element=".$array[$j];
//echo "<br>usergroupasint element=".$UserGroupAsInt['Editor'];
//echo "<br>usergroupasint elementx2=".$UserGroupAsInt['Editor'];
//echo "<br>";print_r ($UserGroupAsInt);
//echo "<br>result of lookup=";
//print_r (ReadUserGroup("111610820"));

//---for debug
//$res=ReadUserGroup('8211524631');
//$res=ReadUserGroup('111610819');
//$res=ReadUserGroup('111610820');
//echo "<br>ReadUserGroup() returns=".print_r($res);
//SessionStart("111610819");

/*
$test_array=array();
echo "<br>IsActionAllowed()=".IsActionAllowed("guest", "SelectCompany",$test_array);
*/

//echo "<br>CanUserModifyUser=". CanUserModifyUser('99881225','20012533');

/*
SessionStart("99881225");
$test_array=array(
    
    'CompanyID'=>'serranosa',
    
);

echo "<br>test_array=".print_r($test_array);
print "<br>\nUserGroupArray=". print_r($_SESSION["UserGroupArray"]);
echo "<br>IsAllowedSelectCompany()=".IsAllowedSelectCompany($_SESSION["UserGroupArray"],$test_array);
*/


?>