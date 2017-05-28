<?php
include_once "query_creator.php";

//-----------------------0.VAR DEF -------------------------------------

//0.1 array to define the reaction according to user and target
//assuming both are in the same company
$user2target_array = array(
    
  'guest' => function($target) { return guest2target($target);},
  'viewer' => function($target) { return viewer2target($target);},
  'editor' => function($target) { return editor2target($target);},
  'administrator' => function($target) { return administrator2target($target);},
  'owner' => function($target) { return owner2target($target);},
  'developer' => function($target) { return developer2target($target);},
  'technician' => function($target) { return technician2target($target);},          
);


//0.2 array to define the permissions according to action
//parameters: $UG=usergroup (of logged user), $array_parameters=url array
  
$actiondB_allowed_array = array(

    'SelectCompany'=>function($UG,$array_parameters){return IsAllowedSelectCompany($UG,$array_parameters);},
    'SelectUser'=>function($UG,$array_parameters){return IsAllowedSelectUser($UG,$array_parameters);},
    'SelectPatient'=>function($UG,$array_parameters){return IsAllowedSelectPatient($UG,$array_parameters);},
    'InsertUser'=>function($UG,$array_parameters){return IsAllowedInsertUser($UG,$array_parameters);},
    'DeleteUser'=>function($UG,$array_parameters){return IsAllowedDeleteUser($UG,$array_parameters);},
    'SetUserPWD'=>function($UG,$array_parameters){return IsAllowedSetUserPWD($UG,$array_parameters);},
    'UpdateUser'=>function($UG,$array_parameters){return IsAllowedUpdateUser($UG,$array_parameters);},
    'UpdateUser_byUserID'=>function($UG,$array_parameters){return IsAllowedUpdateUser_byUserID($UG,$array_parameters);},
    'ListFFDUser'=>function($UG,$array_parameters){return IsAllowedListFFDUser($UG,$array_parameters);},
    'FFDUser'=>function($UG,$array_parameters){return IsAllowedFFDUser($UG,$array_parameters);},
    'UFFDUser'=>function($UG,$array_parameters){return IsAllowedUFFDUser($UG,$array_parameters);},
    'InsertCompany'=>function($UG,$array_parameters){return IsAllowedInsertCompany($UG,$array_parameters);},
    'ListDepartment'=>function($UG,$array_parameters){return IsAllowedListDepartment($UG,$array_parameters);},
    'InsertDepartment'=>function($UG,$array_parameters){return IsAllowedInsertDepartment($UG,$array_parameters);},
    'DeleteDepartment'=>function($UG,$array_parameters){return IsAllowedDeleteDepartment($UG,$array_parameters);},
    'DeletePatient'=>function($UG,$array_parameters){return IsAllowedDeletePatient($UG,$array_parameters);},
    'ListCompany'=>function($UG,$array_parameters){return IsAllowedListCompany($UG,$array_parameters);},
    'DeleteCompany'=>function($UG,$array_parameters){return IsAllowedDeleteCompany($UG,$array_parameters);},
    'UpdatePatient'=>function($UG,$array_parameters){return IsAllowedUpdatePatient($UG,$array_parameters);},
    'UpdateCompany'=>function($UG,$array_parameters){return IsAllowedUpdateCompany($UG,$array_parameters);},
    'SelectAPP'=>function($UG,$array_parameters){return IsAllowedSelectAPP($UG,$array_parameters);},
    'SelectAPNP'=>function($UG,$array_parameters){return IsAllowedSelectAPNP($UG,$array_parameters);},
    'SelectAQX'=>function($UG,$array_parameters){return IsAllowedSelectAQX($UG,$array_parameters);},
    'SelectMED'=>function($UG,$array_parameters){return IsAllowedSelectMED($UG,$array_parameters);},
    'SelectINJ'=>function($UG,$array_parameters){return IsAllowedSelectINJ($UG,$array_parameters);},
    'SelectBodyComp'=>function($UG,$array_parameters){return IsAllowedSelectBodyComp($UG,$array_parameters);},
    'InsertHistoryTest'=>function($UG,$array_parameters){return IsAllowedInsertHistoryTest($UG,$array_parameters);},
    'ReadPatientHistoryVars'=>function($UG,$array_parameters){return IsAllowedReadPatientHistoryVars($UG,$array_parameters);},
    'ReadPatientVars'=>function($UG,$array_parameters){return IsAllowedReadPatientVars($UG,$array_parameters);},
    'ReadAllPatientHistorybyCompanyIDVars'=>function($UG,$array_parameters){return IsAllowedReadAllPatientHistorybyCompanyIDVars($UG,$array_parameters);},
    'DownloadCompanyReport'=>function($UG,$array_parameters){return IsAllowedDownloadCompanyReport($UG,$array_parameters);},
    'InsertPatient'=>function($UG,$array_parameters){return IsAllowedInsertPatient($UG,$array_parameters);},
    'InsertUserPermission'=>function($UG,$array_parameters){return IsAllowedInsertUserPermission($UG,$array_parameters);},

);



  
//------------------------1. FUNCT DEF ----------------------------------  

//1.1 to define if user (guest/editor/etc) can modify the target user profile
//assumes that both are in same company
//intended to be used in conjuntion with  "$user2target_array" 
function guest2target($target){
    
    return -1;//guest doesnt modify any user
    
}
//eof

function viewer2target($target){
    
    return -1;//viewer doesnt modify any user
}

function editor2target($target){
    
    echo "<br>editor2target($target) executing";
    
    
    if(strcmp($target,'guest')==0)return 1;
    else if(strcmp($target,'viewer')==0)return 1;
    else return -1;
}

function administrator2target($target){

    if(strcmp($target,'guest')==0)return 1;
    else if(strcmp($target,'viewer')==0)return 1;
    else if(strcmp($target,'editor')==0)return 1;
    else return -1;
    
    
}

function owner2target($target){
    if(strcmp($target,'guest')==0)return 1;
    else if(strcmp($target,'viewer')==0)return 1;
    else if(strcmp($target,'editor')==0)return 1;
    else if(strcmp($target,'administrator')==0)return 1;
    else return -1;
}


function developer2target($target){
    if(strcmp($target,'guest')==0)return 1;
    else if(strcmp($target,'viewer')==0)return 1;
    else if(strcmp($target,'editor')==0)return 1;
    else if(strcmp($target,'administrator')==0)return 1;
    else if(strcmp($target,'owner')==0)return 1;
    else return -1;
}

function technician2target($target){
    return -1;
}

//1.2 function to check permissions based on url address and user logged in. 
//these functions decice wheter a page can be accesed or not
//No need to run a query
//parameters:$array_parameters=url string, $ug=array with session info containing the companyid/ug
//
function IsAllowedSelectCompany($UG,$array_parameters){

    //if companyid exists in url and also that user belongs to it
    if (array_key_exists('CompanyID', $array_parameters) && array_key_exists($array_parameters['CompanyID'], $UG) ) {
        
        $usergroup=$UG[$array_parameters['CompanyID']];//reading usergroup
        //echo "<br>user usergroup=".$usergroup;
        
        if(strcmp($usergroup,'guest')==0) return -1;
        else if(strcmp($usergroup,'viewer')==0) return 1;
        else if(strcmp($usergroup,'editor')==0) return 1;
        else if(strcmp($usergroup,'administrator')==0) return 1;
        else if(strcmp($usergroup,'owner')==0) return 1;
        else if(strcmp($usergroup,'technician')==0) return 1;
        else if(strcmp($usergroup,'developer')==0) return 1;
        else return -1;
    }else if (array_key_exists('CompanyID', $array_parameters) && !array_key_exists($array_parameters['CompanyID'], $UG) ) {
        //companyid exists in url but that user doesnt belong to it
        
        $max_usergroup=GetMaxUG($UG);
        echo "<br>Maximum usergroup=".$max_usergroup;
        
        if(strcmp($max_usergroup,'guest')==0) return -1;
        else if(strcmp($max_usergroup,'viewer')==0) return 1;
        else if(strcmp($max_usergroup,'editor')==0) return 1;
        else if(strcmp($max_usergroup,'administrator')==0) return 1;
        else if(strcmp($max_usergroup,'owner')==0) return 1;
        else if(strcmp($max_usergroup,'technician')==0) return 1;
        else if(strcmp($max_usergroup,'developer')==0) return 1;
        else return -1;
    }else{
        
        //companyid doesnt exist in url
        return -1;
        
    }
    
    
}
//eof

function IsAllowedSelectUser($UG,$array_parameters){
    
    //if companyid exists in url and also that user belongs to it
    if (array_key_exists('CompanyID', $array_parameters) && array_key_exists($array_parameters['CompanyID'], $UG) ) {
        
        $usergroup=$UG[$array_parameters['CompanyID']];//reading usergroup
        //echo "<br>user usergroup=".$usergroup;
        
        if(strcmp($usergroup,'guest')==0) {
            
            //FIXME:make sure that it selects just his own user
            return -1;
  
        }else if(strcmp($usergroup,'viewer')==0){ 
            
            //FIXME:make sure that it selects just his own user
            return -1;            
            
        }else if(strcmp($usergroup,'editor')==0){
            
            //FIXME: make sure it selects justs his own user or who belongs to their companies
            
            return 1;
            
        }else if(strcmp($usergroup,'administrator')==0){
            
            //FIXME: make sure it selects justs his own user and belongs to heir companies
            return 1;
            
        }else if(strcmp($usergroup,'owner')==0) return 1;
        else if(strcmp($usergroup,'technician')==0) return 1;
        else if(strcmp($usergroup,'developer')==0) return 1;
        else return -1;
    }else if (array_key_exists('CompanyID', $array_parameters) && !array_key_exists($array_parameters['CompanyID'], $UG) ) {
        //companyid exists in url but that user doesnt belong to it
        
        $max_usergroup=GetMaxUG($UG);
        echo "<br>Maximum usergroup=".$max_usergroup;
        
        if(strcmp($max_usergroup,'guest')==0) return -1;
        else if(strcmp($max_usergroup,'viewer')==0)return -1;
        else if(strcmp($max_usergroup,'editor')==0) {
            
             
            return -1;
        }else if(strcmp($max_usergroup,'administrator')==0) return 1;
        else if(strcmp($max_usergroup,'owner')==0) return 1;
        else if(strcmp($max_usergroup,'technician')==0) return 1;
        else if(strcmp($max_usergroup,'developer')==0) return 1;
        else return -1;
    }else{
        
        //companyid doesnt exist in url
        return -1;
        
    }

}

function IsAllowedInsertUser($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedDeleteUser($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedSetUserPWD($UG,$array_parameters){
    
    //FIXME: add content
}

function IsAllowedUpdateUser($UG,$array_parameters){
    
    $usergroup="NONE";//logged user's usergroup
    
    echo "<br>Executing IsAllowedUpdateUser()";
    
    //if user exists in url and also that user belongs to it
    if (array_key_exists('UserID', $array_parameters) && array_key_exists('RowID', $array_parameters)) {
        
        //read company which patient belongs to
        $company_result=ReadUserCompany($array_parameters['UserID'],$array_parameters['RowID'],FALSE); 
        echo "<br>target company=".$company_result;
        
        //read user's usergroup in that company
        $usergroup_result = ReadUserGroupByUserIDRowID($array_parameters['UserID'],$array_parameters['RowID'],FALSE);
        echo "<br>target usergroup=".$usergroup_result;
        
        //checking if any of the companyid in user session matches the patient's companyid
        if(strcmp($company_result,"NONE")!=0 && strcmp($usergroup_result,"NONE")!=0 && array_key_exists($company_result,$UG)){
            
            $usergroup = $UG[$company_result];//reading the usergroup that matches the company patient
            echo "<br>This is the (company,ug) that match the user=($company_result,$usergroup)";

            if(strcmp($usergroup,'guest')==0) {
                return -1;

            }else if(strcmp($usergroup,'viewer')==0){
                return -1;
            }else if(strcmp($usergroup,'editor')==0){

                if(strcmp($usergroup_result,'guest')==0)return 1;
                else return -1;

            }else if(strcmp($usergroup,'administrator')==0){
                
                if(strcmp($usergroup_result,'guest')==0)return 1;
                else if(strcmp($usergroup_result,'viewer')==0)return 1;
                else if(strcmp($usergroup_result,'editor')==0)return 1;
                else if(strcmp($usergroup_result,'technician')==0)return 1;
                else return -1;
                
            }else if(strcmp($usergroup,'owner')==0){

                if(strcmp($usergroup_result,'guest')==0)return 1;
                else if(strcmp($usergroup_result,'viewer')==0)return 1;
                else if(strcmp($usergroup_result,'editor')==0)return 1;
                else if(strcmp($usergroup_result,'administrator')==0)return 1;
                else if(strcmp($usergroup_result,'technician')==0)return 1;
                else return -1;
                
            }else if(strcmp($usergroup,'technician')==0) {
                return -1;
            }else if(strcmp($usergroup,'developer')==0){
                return 1;
            }else {
                return -1;
            } 
            
        }else if (strcmp($company_result,"NONE")==0 || strcmp($usergroup_result,"NONE")==0){
            
            //userid doesn't exist
            return -1;
            
        }else{
            
            echo "<br>This (company,ug) don't match the patient=($company_result,$usergroup)";
            //read maximum user group for logged user, since he doesn't belong to same company 
            $usergroup=GetMaxUG(ReadUserGroup($_SESSION['UserID']));
            
            

            if(strcmp($usergroup,'guest')==0) return -1;
            else if(strcmp($usergroup,'viewer')==0) return -1;
            else if(strcmp($usergroup,'editor')==0) return -1;
            else if(strcmp($usergroup,'administrator')==0) return -1;
            else if(strcmp($usergroup,'owner')==0) return 1;
            else if(strcmp($usergroup,'technician')==0) return -1;
            else if(strcmp($usergroup,'developer')==0) return 1;
            else return -1;                  
        }
        
    }else{
        echo "<br>Returning -1, the patient is not in the url";
        return -1;//returning -1 cause PatientID is not in the url
    }
}//eof IsAllowedUpdateUser


function IsAllowedUpdateUser_byUserID($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedListFFDUser($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedFFDUser($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedUFFDUser($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedInsertCompany($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedListDepartment($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedInsertDepartment($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedDeleteDepartment($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedDeletePatient($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedListCompany($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedDeleteCompany($UG,$array_parameters){
    
    //FIXME: add content
}

function IsAllowedUpdatePatient($UG,$array_parameters){
    
    $usergroup="NONE";
    
    echo "<br>Executing IsAllowedUpdatePatient()";
    
    //if patients exists in url and also that user belongs to it
    if (array_key_exists('PatientID', $array_parameters)) {
        
        
        //read company which patient belongs to
        $company_result=ReadPatientCompany($array_parameters['PatientID'],FALSE); 
        //echo "<br>query_results=".$query_result;
        
        //checking if any of the companyid in user session matches the patient's companyid
        if(strcmp($company_result,"NONE")!=0 && array_key_exists($company_result,$UG)){
            
            $usergroup = $UG[$company_result];//reading the usergroup that matches the company patient
            echo "<br>This is the (company,ug) that match the patient=($company_result,$usergroup)";
            
            if(strcmp($usergroup,'guest')==0) return -1;
            else if(strcmp($usergroup,'viewer')==0) return -1;
            else if(strcmp($usergroup,'editor')==0) return 1;
            else if(strcmp($usergroup,'administrator')==0) return 1;
            else if(strcmp($usergroup,'owner')==0) return 1;
            else if(strcmp($usergroup,'technician')==0) return -1;
            else if(strcmp($usergroup,'developer')==0) return 1;
            else return -1;            
            
        }else{
            
            echo "<br>This (company,ug) don't match the patient=($company_result,$usergroup)";
            $usergroup=GetMaxUG($UG);
            echo "<br>The maximum usergroup=".$usergroup;
            
            if(strcmp($usergroup,'guest')==0) return -1;
            else if(strcmp($usergroup,'viewer')==0) return -1;
            else if(strcmp($usergroup,'editor')==0) return -1;
            else if(strcmp($usergroup,'administrator')==0) return -1;
            else if(strcmp($usergroup,'owner')==0) return 1;
            else if(strcmp($usergroup,'technician')==0) return -1;
            else if(strcmp($usergroup,'developer')==0) return 1;
            else return -1;                  
        }
        
    }else{
        echo "<br>Returning -1, the patient is not in the url";
        return -1;//returning -1 cause PatientID is not in the url
    }

}

//function to determine if user can edit company
//parameters: $UG=usergroup data(use $_SESSION["UserGroupArray"] ),$array_parameters=url array formated, containing the companyid
function IsAllowedUpdateCompany($UG,$array_parameters){

    //if companyid exists in url and also that user belongs to it
    
    if (array_key_exists('CompanyID', $array_parameters) && array_key_exists($array_parameters['CompanyID'], $UG) ) {
        
        $usergroup=$UG[$array_parameters['CompanyID']];//reading usergroup
        //echo "<br>user usergroup=".$usergroup;
        
        if(strcmp($usergroup,'guest')==0) return -1;
        else if(strcmp($usergroup,'viewer')==0) return -1;
        else if(strcmp($usergroup,'editor')==0) return -1;
        else if(strcmp($usergroup,'administrator')==0) return 1;
        else if(strcmp($usergroup,'owner')==0) return 1;
        else if(strcmp($usergroup,'technician')==0) return 1;
        else if(strcmp($usergroup,'developer')==0) return 1;
        else return -1;
    }else if (array_key_exists('CompanyID', $array_parameters) && !array_key_exists($array_parameters['CompanyID'], $UG) ) {
        //companyid exists in url but that user doesnt belong to it
        
        $max_usergroup=GetMaxUG($UG);
        //echo "<br>Maximum usergroup=".$max_usergroup;
        
        if(strcmp($max_usergroup,'guest')==0) return -1;
        else if(strcmp($max_usergroup,'viewer')==0) return -1;
        else if(strcmp($max_usergroup,'editor')==0) return -1;
        else if(strcmp($max_usergroup,'administrator')==0) return -1;
        else if(strcmp($max_usergroup,'owner')==0) return 1;
        else if(strcmp($max_usergroup,'technician')==0) return -1;
        else if(strcmp($max_usergroup,'developer')==0) return 1;
        else return -1;
    }else{
        
        //companyid doesnt exist in url
        return -1;
        
    }
    
    
}
//eof IsAllowedUpdateCompany()

function IsAllowedSelectAPP($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedSelectAPNP($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedSelectAQX($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedSelectMED($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedSelectINJ($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedSelectBodyComp($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedInsertHistoryTest($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedReadPatientHistoryVars($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedReadPatientVars($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedReadAllPatientHistorybyCompanyIDVars($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedDownloadCompanyReport($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedInsertPatient($UG,$array_parameters){
    
    //FIXME: add content
}
function IsAllowedInsertUserPermission($UG,$array_parameters){
    
    //FIXME: add content
}


//1.3 function get maximum usergroup hierarchy for the logged in user
//its intended to be read from $_SESSION["UserGroupArray"] array
//parameter: $ug_array=usergroup array, stored in $_SESSION["UserGroupArray"]
//purpose of this function: to help decide in cases where there are several usergroups for same user
function GetMaxUG($ug_array){
    
    //this is used to prevent hacking attack (naming the companyid as usergroup to confuse the system
    if(array_key_exists('developer', $ug_array)) return "NONE";
    else if(array_key_exists('owner', $ug_array)) return "NONE";
    else if(array_key_exists('administrator', $ug_array)) return "NONE";
    else if(array_key_exists('editor', $ug_array)) return "NONE";
    else if(array_key_exists('viewer', $ug_array)) return "NONE";
    else if(array_key_exists('technician', $ug_array)) return "NONE";
    
    
    if(in_array("developer", $ug_array)) return "developer";
    else if(in_array("owner", $ug_array)) return "owner";
    else if(in_array("administrator", $ug_array)) return "administrator";
    else if(in_array("editor", $ug_array)) return "editor";
    else if(in_array("viewer", $ug_array)) return "viewer";
    else if(in_array("guest", $ug_array)) return "guest";
    else if(in_array("technician", $ug_array)) return "technician";
    else return "NONE";
    
}
//eof


?>