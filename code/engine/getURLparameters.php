<?php
include_once "query_creator.php";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$action = ""; 
$where_conditions = "";
$from_table = "";
$set_value = "";
$into_table = "";
$update_table = "";
$array_parameters = array();

$queryfunctions = array(
    
  'CheckLoginCredentials' => function($array_parameters) { CheckLoginParams($array_parameters);},  
  'Logout' => function($array_parameters) { LogoutParams();},  
  'SelectCompany' => function($array_parameters) { ReadCompanyParams($array_parameters);},
  'SelectUser'    => function($array_parameters) { ReadUsersParams($array_parameters);},          
  'SelectPatient' => function($array_parameters) { ReadPatientParams($array_parameters);},
  'InsertUser'    => function($array_parameters) { InsertUsersParams($array_parameters);},
  'InserUser2' => function($array_parameters) { InsertUsersParams2($array_parameters, 'users');},          
  'DeleteUser'    => function($array_parameters) { DeleteUsersParams($array_parameters);},  
  'SetUserPWD'    => function($array_parameters) { UpdateUserPWDParams($array_parameters);},
  'UpdateUser'    => function($array_parameters) { UpdateUsersParams($array_parameters,false);}, 
  'UpdateUser_byUserID'    => function($array_parameters) { UpdateUsersParams($array_parameters,true);},
  'ListFFDUser' => function($array_parameters) { ListFlaggedForDeleteUser();},
  'FFDUser' => function($array_parameters) { FlagForDeleteUser($array_parameters);},
  'UFFDUser' => function($array_parameters) { UnflagForDeleteUser($array_parameters);},
  'FFDUserList' => function($array_parameters) { FlagForDeleteUserList($array_parameters);},
  'UFFDUserList' => function($array_parameters) { UnFlagForDeleteUserList($array_parameters);},
  'InsertCompany' => function($array_parameters) { InsertCompanyParams($array_parameters);},
  'ListDepartment' => function($array_parameters) { ReadDepartmentListParams();},
  'InsertDepartment' => function($array_parameters) { InsertDepartmentParams($array_parameters);},
  'DeleteDepartment' => function($array_parameters) { DeleteDepartmentParams($array_parameters);},
  'DeletePatient' => function($array_parameters) { DeletePatientParams($array_parameters);},
  'ListCompany'   => function($array_parameters) { ReadCompanyListParams($array_parameters);},          
  'DeleteCompany' => function($array_parameters) { DeleteCompanyParams($array_parameters);},
  'UpdatePatient' => function($array_parameters) { UpdatePatientParams($array_parameters);},
  'UpdateCompany' => function($array_parameters) { UpdateCompanyParams($array_parameters);},
  'SelectAPP' => function($array_parameters) { ReadEvaluationConstParams($array_parameters);},
  'SelectAPNP' => function($array_parameters) { ReadEvaluationConstParams($array_parameters);},
  'SelectAQX' => function($array_parameters) { ReadEvaluationConstParams($array_parameters);},
  'SelectMED' => function($array_parameters) { ReadEvaluationConstParams($array_parameters);},
  'SelectINJ' => function($array_parameters) { ReadEvaluationConstParams($array_parameters);},
  'SelectBodyComp' => function($array_parameters) { ReadEvaluationConstParams($array_parameters);},
  'dummytest' => function($array_parameters) { InsertUsersParams2($array_parameters, 'users');},
  'InsertHistoryTest' => function($array_parameters) { InsertEvaluationHistoryParams($array_parameters);},
  'ReadPatientHistoryVars' => function($array_parameters) { ReadPatientHistoryParams($array_parameters);},
  'ReadPatientEvaluationVars' => function($array_parameters) { ReadPatientEvaluationParams($array_parameters);},
  'ReadPatientHistoryVars2' => function($array_parameters) { ReadPatientHistoryParams2($array_parameters);},
  'ReadPatientVars' => function($array_parameters) { ReadPatientBlockParams($array_parameters);}, 
  'ReadAllPatientHistorybyCompanyIDVars' => function($array_parameters) { ReadAllPatientHistorybyCompanyID($array_parameters);},  
  'DownloadCompanyReport' => function($array_parameters) { DownloadAllPatientHistorybyCompanyID($array_parameters);},            
  'InsertPatient' => function($array_parameters) { InsertPatientParams($array_parameters);},
  'InsertUserPermission' => function($array_parameters) { AddUserPermission($array_parameters,'users');}
);
 
function callActionFunctions($action, $parameter)
{
    global $queryfunctions;
    //print_r($action_function_array);
    call_user_func($queryfunctions[$action], $parameter);
}


function setquerycomponets_array($array)
{
   global $array_parameters;
   $array_parameters = $array;
}

function checkGETempty($printingconsole=FALSE){
    if (empty($_GET)) {
        if ($printingconsole) {print "URL parameters are empty";}
        return TRUE;
    }
    else{
        if ($printingconsole) {print "URL parameters are populated";}
        return FALSE;
    }
}

function printGETarray(){
    if (!checkGETempty()) {
        print_r($_GET);
    }
}

function getGETarray($printingconsole=FALSE){
    if (!checkGETempty()) {
        if ($printingconsole) {print_r($_GET);}
        return $_GET;
    }
    else{
        if ($printingconsole) {print "_GET array is empty";}
        return array();
    }
}

function getQuerystatement($input){
    preg_match("/(.*)(_Token)/", $input, $output_array);
    if (!empty($output_array)) {
    return $output_array[1];
    }else
    {
    return $input;
    }
}
function parsingGETarray(){
    global $action, $where_conditions, $from_table, $set_value, $into_table, $update_table;
    $URLparameter_array = array();
    if (!checkGETempty()) {
        $URLparameter = $_GET;
    }
    $action = $URLparameter['ActionDBToken'];
    unset($URLparameter['ActionDBToken']);
    
    $set_value = set_key_value($URLparameter);
    global $functions;
    //print_r($action_function_array);
    call_user_func($functions['function1'], $action);

}


function getquery_action($array){
    $action = "";
    if (!checkGETempty()) {
        $URLparameter = $array;
        $action = $URLparameter['ActionDBToken'];
    }
    return $action;
}

function getquerycomponents_array($array){
    $URLparameter = array();
    if (!checkGETempty()) {
        $URLparameter = $array;
        unset($URLparameter['ActionDBToken']);
    }
    return $URLparameter;
}



?>
