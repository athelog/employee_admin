<?php

include "ReadXML.php";


//VAR DEF




//END OF VAR


//FUNCT DEF

/*
$UserProfileCreatedMessage=[];$UserProfileCreatedReceivers=[];
$UserProfileDataChangedMessage=[];$UserProfileDataChangedReceivers=[];
$UserAccessDataChangedMessage=[];$UserAccessDataChangedReceivers=[];
$UserProfileFlaggedForDeletionMessage=[];$UserProfileFlaggedForDeletionReceivers=[];
$UserProfileDeletedMessage=[];$UserProfileDeletedReceivers=[];
$PatientProfileCreatedMessage=[];$PatientProfileCreatedReceivers=[];
$PatientProfileDataChangedMessage=[];$PatientProfileDataChangedReceivers=[];
$PatientProfileFlaggedForDeletionMessage=[];$PatientProfileFlaggedForDeletionReceivers=[];
$PatientProfileDeletedMessage=[];$PatientProfileDeletedReceivers=[];
$CompanyProfileCreatedMessage=[];$CompanyProfileCreatedReceivers=[];
$CompanyProfileDataChangedMessage=[];$CompanyProfileDataChangedReceivers=[];
$CompanyProfileFlaggedForDeletionMessage=[];$CompanyProfileFlaggedForDeletionReceivers=[];
$CompanyProfileDeletedMessage=[];$CompanyProfileDeletedReceivers=[]


 */


//function to return array with the following strings:[0]$CC_Receivers,[1]$BC_Receivers,[2]$TO_Receivers
//inputs: $mail_receivers=global array with xml config, $TechnicianMailAccounts,$DeveloperMailAccounts,$OwnerMailAccounts
function CreateMailDestinationStrings($mail_receivers,$technicianMailAccounts,$developerMailAccounts,$ownerMailAccounts){
    
    foreach($mail_receivers as $key=>$val) { 
        
        //echo "<br>Checking settings for $key";
        
        if(strcmp($key,"Technician")==0){
            
            if(strcmp($val,"CC")==0)$CC_Receivers.=$technicianMailAccounts.",";
            else if(strcmp($val,"BC")==0)$BC_Receivers.=$technicianMailAccounts.",";
            else if(strcmp($val,"TO")==0)$TO_Receivers.=$technicianMailAccounts.",";
            
        }else if(strcmp($key,"Developer")==0){

            if(strcmp($val,"CC")==0)$CC_Receivers.=$developerMailAccounts.",";
            else if(strcmp($val,"BC")==0)$BC_Receivers.=$developerMailAccounts.",";
            else if(strcmp($val,"TO")==0)$TO_Receivers.=$developerMailAccounts.",";            
            
        }else if(strcmp($key,"Owner")==0){
            
            if(strcmp($val,"CC")==0)$CC_Receivers.=$ownerMailAccounts;
            else if(strcmp($val,"BC")==0)$BC_Receivers.=$ownerMailAccounts;
            else if(strcmp($val,"TO")==0)$TO_Receivers.=$ownerMailAccounts; 
        }
        

    } 
    //end of for    
    
    $result=array(
        
        0=>$CC_Receivers,
        1=>$BC_Receivers,
        2=>$TO_Receivers,
    );
    
    return $result;
    
} 
//eof



function SendMailNotification_UserProfileCreate($target_data, $modifierid){
    
   
    echo "<br><br>Executing SendMailNotification_UserProfileCreate()";
    
    global $UserProfileCreatedMessage;
    global $UserProfileCreatedReceivers;
    global $TechnicianMailAccounts;
    global $DeveloperMailAccounts;
    global $OwnerMailAccounts;
    
    $CC_Receivers="";
    $BC_Receivers="";
    $TO_Receivers=$target_data['target_userid'];
    
    $MailDestination="";
    $MailSubject="";
    $MailText="";
    //$MailHeaders .= "From:Bicoyed".PHP_EOL;
    //$MailHeaders .= "BCC:rvargas@athelog.net,info@athelog.net,ramirovq@gmail.com,rvq25@hotmail.com".PHP_EOL; 
    $MailHeaders .= "From:".ReadInstallationOwner().PHP_EOL;//
    
    //echo "<br>UserProfileCreatedReceivers="; print_r ($UserProfileCreatedReceivers);
    //echo "<br>TechnicianMailAccounts=".$TechnicianMailAccounts;
    
    //building the receiver mail
    $mail_strings=CreateMailDestinationStrings($UserProfileCreatedReceivers,$TechnicianMailAccounts,$DeveloperMailAccounts,$OwnerMailAccounts);
    $CC_Receivers=$mail_strings[0];
    
    //$BC_Receivers=$mail_strings[1].PHP_EOL;
    //$BC_Receivers="";
    $BC_Receivers="rvargas@athelog.net,info@athelog.net,ramirovq@gmail.com,rvq25@hotmail.com";
    $TO_Receivers=$target_data['email'].",".$mail_strings[2];    
    
    
    //filling the mail
    $MailDestination=$TO_Receivers;
    $MailSubject=$UserProfileCreatedMessage['Subject'];
    $MailText.= $UserProfileCreatedMessage['Dear']." ".$target_data['name']." (".$target_data['userid']."),";//name
    $MailText.="\n".$UserProfileCreatedMessage['Body'][0];
    //$MailText.="\n".$UserProfileCreatedMessage['Body'][1].$target_data['userid'];//userid
    //$MailText.="\n".$UserProfileCreatedMessage['Body'][2].$target_data['name'];//name
    $MailText.="\n".$UserProfileCreatedMessage['Body'][3].$target_data['userid'];//username
    $MailText.="\n".$UserProfileCreatedMessage['Body'][4].$target_data['password'];//password
    $MailText.="\n".$UserProfileCreatedMessage['Body'][5];//warning
    $MailText.="\n".$UserProfileCreatedMessage['Body'][6];//farewell
    $MailText.="\n".$UserProfileCreatedMessage['Body'][7].$modifierid;//modifierid
    $MailText.="\n".$UserProfileCreatedMessage['Footer']." ".$TechnicianMailAccounts;//footer

    if(strcmp($CC_Receivers,"")!=0)$MailHeaders .= " ;CC:".$CC_Receivers.PHP_EOL;
    if(strcmp($BC_Receivers,"")!=0)$MailHeaders .= " ;BCC:".$BC_Receivers.PHP_EOL;

    
            
    //for debug
    echo "<br>-----Message Data------:";
    echo "<br>Destination=".$MailDestination;
    echo "<br>Headers=".$MailHeaders;
    echo "<br>Mail text=".$MailText;
    
    //$MailDestination=
    
    //echo "UserProfile"
    
    
    
    mail($MailDestination,$MailSubject,$MailText,$MailHeaders);
    
}

//END OF FUNCT DEF

$array_test_userdata=array(
  
    'name'=>'Rodrigo Lara Lopez',
    'userid'=>'532224189',
    'password'=>'Hullowres',
    'email'=>'rvargas@athelog.net',
);

SendMailNotification_UserProfileCreate($array_test_userdata, "111610819");


?>