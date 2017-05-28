<?php

include("DBArrayQuery.php");
include_once "conexionDB.php";
include_once "usergroupdef.php";
include_once "session.php";


//------- IsAllowedSelectCompany()----------


//SessionStart("99881225");//editor of serranosa
SessionStart("111610819");//developer of arenasa, viewer of cargoship
$test_array=array(
    
    //'CompanyID'=>'serranosa',
    'CompanyID'=>'soledadsa',
     //'CompanyID'=>'arenasa',
);


echo "<br>test_array=".print_r($test_array);
print "<br>\nUserGroupArray=". print_r($_SESSION["UserGroupArray"]);
echo "<br>IsAllowedSelectCompany()=".IsAllowedSelectCompany($_SESSION["UserGroupArray"],$test_array);


//--------end of IsAllowedSelectCompany()-----

//--------GetMaxUG($ug_array)-----------

/*
$test_array=array(
    
    //"serranosa"=>"administrator",
    "espana"=>"viewer",
    "juliet"=>"editor",
    "pastosa"=>"technician",
    //"xulua"=>"ssdsd",
        
);

$test_array_illegal=array(
    
    //"serranosa"=>"administrator",
    "administrator"=>"viewer",
    "juliet"=>"editor",
    "pastosa"=>"technician",
    //"xulua"=>"ssdsd",
        
);

echo "<br>GetMaxUG(test_arrays)=".GetMaxUG($test_array);
echo "<br>GetMaxUG(test_arrays_illegal_cases)=".GetMaxUG($test_array_illegal);
*/
//--------end of GetMaxUG($ug_array)----




?>
