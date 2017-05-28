var fetch = angular.module('fetch', []);

	fetch.controller('dbCtrl', ['$scope', '$http', function ($scope, $http) {
		
		//------------1. USER CONST -----------------------
		var GeneralGlobals ={};
		GeneralGlobals['DebugFlag']="NONE"; //NONE, TRUE,
		
		
		//------------2. PROGRAM VARS (DON'T TOUCH) -------
		
		//alert("(DEBUG)Welcome to users screen v1.58");
		
		//scope vars
				
		//to read values from HTML <patient> search fields
		var UserData = {};		
		UserData['UserID_FieldValue']="NONE";//
		UserData['PassHash_FieldValue']="NONE";//
		UserData['Forename_FieldValue']="NONE";//
		UserData['MiddleName_FieldValue']="NONE";//
		UserData['FirstSurname_FieldValue']="NONE";//
		UserData['SecondSurname_FieldValue']="NONE";//
		UserData['Phone_FieldValue']="NONE";//
		UserData['Email_FieldValue']="NONE";//
		UserData['CompanyID_FieldValue']="NONE";//
		UserData['JoinDate_FieldValue']="NONE";
		UserData['UserGroup_FieldValue']="NONE";
		UserData['Status_FieldValue']="NONE";
		
		
		//to read URL params var
		var URLParams = {};
		URLParams['Action'] = "NONE";
		URLParams['ID'] = "NONE";
                URLParams['RowID'] = "NONE";
		URLParams['Message'] = "NONE";
		
		
		//-------------2. FUNCTIONS-----------------------------
		
		//0.Resetting user values read from input text fields
		function ResetUserFieldValues(){			

			UserData.UserID_FieldValue="NONE";//
			UserData.PassHash_FieldValue="NONE";//
			UserData.Forename_FieldValue="NONE";//
			UserData.MiddleName_FieldValue="NONE";//
			UserData.FirstSurname_FieldValue="NONE";//
			UserData.SecondSurname_FieldValue="NONE";//
			UserData.Phone_FieldValue="NONE";//
			UserData.Email_FieldValue="NONE";//
			UserData.CompanyID_FieldValue="NONE";//
			UserData.JoinDate_FieldValue="NONE";
			UserData.UserGroup_FieldValue="NONE";
			UserData.Status_FieldValue="NONE";			
		};
		//end of resetting
		
		//function to check parameters
		//returns 1 if params are valid, if invalid:0	(invalid=>params are NULL, NONE or undefined)	
		function CheckURLParameters(){	

			
			//vars to read URL parameters
			URLParams.Action=getUrlVars()["Action"];
			URLParams.ID=getUrlVars()["ID"];
			URLParams.Message=getUrlVars()["Message"];
                        URLParams.RowID=getUrlVars()["RowID"];

			var var1_valid=0;
			var var2_valid=0;
			var result=0;
			
			//checking if params are valid
			if (typeof URLParams.Action === 'undefined' || URLParams.Action === null || URLParams.Action === "NONE" || URLParams.Action === "") {
				//alert("(DEBUG) Action_Param = undefined,NONE or null");
				var1_valid=0;
				
			}else{
				//alert("(DEBUG) Action_Param ="+Action_Param);
				var1_valid=1;		
			}

			if (typeof URLParams.ID === 'undefined' || URLParams.ID === null || URLParams.ID === "NONE" || URLParams.ID === "") {
				//alert("(DEBUG) ID_Param = undefined, NONE or null");
				var2_valid=0;
			}else{				
				var2_valid=1;
			}
			
			//FIXME: add dB check before confirm this
			if (typeof URLParams.Message === "Updated") {
				//alert("Perfil actualizado");
				
			}else{				
				
			}			
			

			//returns TRUE just if both params are different to Null, NONE, undefined or empty
			result = Boolean(var1_valid*var2_valid);
			//alert("(DEBUG)CheckURLParameters(). ID_Param="+URLParams.ID+",Action_Param="+URLParams.Action+"-Returning "+result);
			return result;
						
			
			
		}		
		//eof

		
		//2. read search HTML <user> input fields	
		//no return
		function ReadUserFields() {			
			
			//alert("(DEBUG)ReadUserFields() - starting");
			
			//FIXME:add SHA2 enconding
			if (typeof $scope.Password_Input_Model !== 'undefined' && $scope.Password_Input_Model !== null && $scope.Password_Input_Model !== "") {
				UserData['PassHash_FieldValue'] = $scope.Password_Input_Model;
			}else{
				UserData['PassHash_FieldValue'] = "NONE";
			}
			
			if (typeof $scope.UserID_Input_Model !== 'undefined' && $scope.UserID_Input_Model !== null && $scope.UserID_Input_Model !== "") {
				UserData['UserID_FieldValue'] = $scope.UserID_Input_Model;
			}else{
				UserData['UserID_FieldValue'] = "NONE";
			}
			
			if (typeof $scope.Forename_Input_Model !== 'undefined' && $scope.Forename_Input_Model !== null && $scope.Forename_Input_Model !== "") {
				UserData['Forename_FieldValue'] = $scope.Forename_Input_Model.toLowerCase(); 				
			}else{
				UserData['Forename_FieldValue'] = "NONE";
			}

			if (typeof $scope.MiddleName_Input_Model !== 'undefined' && $scope.MiddleName_Input_Model !== null && $scope.MiddleName_Input_Model !== "") {
				UserData['MiddleName_FieldValue'] = $scope.MiddleName_Input_Model.toLowerCase(); 				
			}else{
				UserData['MiddleName_FieldValue'] = "NONE";
			}
			
			if (typeof $scope.FirstSurname_Input_Model!== 'undefined' && $scope.FirstSurname_Input_Model !== null && $scope.FirstSurname_Input_Model !== "") {
				UserData['FirstSurname_FieldValue']= $scope.FirstSurname_Input_Model.toLowerCase(); 
			}else{
				UserData['FirstSurname_FieldValue'] = "NONE";
			}
			
			if (typeof $scope.SecondSurname_Input_Model !== 'undefined' && $scope.SecondSurname_Input_Model !== null && $scope.SecondSurname_Input_Model !== "") {
				UserData['SecondSurname_FieldValue'] = $scope.SecondSurname_Input_Model.toLowerCase(); 
			}else{
				UserData['SecondSurname_FieldValue'] = "NONE";
			}
			
			if (typeof $scope.UserEmail_Input_Model !== 'undefined' && $scope.UserEmail_Input_Model !== null && $scope.UserEmail_Input_Model !== "") {
				UserData['Email_FieldValue'] = $scope.UserEmail_Input_Model.toLowerCase(); 
			}else{
				UserData['Email_FieldValue'] = "NONE";
			}		
			
			if (typeof $scope.UserPhone_Input_Model !== 'undefined' && $scope.UserPhone_Input_Model !== null && $scope.UserPhone_Input_Model !== "") {
				UserData['Phone_FieldValue'] = $scope.UserPhone_Input_Model; 
			}else{
				UserData['Phone_FieldValue'] = "NONE";
			}				

			if (typeof $scope.CompanyID_Input_Model !== 'undefined' && $scope.CompanyID_Input_Model !== null && $scope.CompanyID_Input_Model !== "") {
				UserData['CompanyID_FieldValue'] = $scope.CompanyID_Input_Model.CompanyID;  
			}else{
				UserData['CompanyID_FieldValue'] = "NONE";
			}			
			
			if (typeof $scope.UserGroupSelect_Input_Model !== 'undefined' && $scope.UserGroupSelect_Input_Model !== null && $scope.UserGroupSelect_Input_Model !== "") {
				UserData['UserGroup_FieldValue'] = $scope.UserGroupSelect_Input_Model;
			}else{
				UserData['UserGroup_FieldValue'] = "NONE";
			}				
			
			if (typeof $scope.StatusSelect_Input_Model !== 'undefined' && $scope.StatusSelect_Input_Model !== null && $scope.StatusSelect_Input_Model !== "") {
				UserData['Status_FieldValue'] = $scope.StatusSelect_Input_Model;  
			}else{
				UserData['Status_FieldValue'] = "NONE";
			}				
			
			$debug_string = "\PassHash="+UserData['PassHash_FieldValue'];
			$debug_string = "\nUserID_FieldValue="+UserData['UserID_FieldValue'];
			$debug_string +="\nForename_FieldValue="+UserData['Forename_FieldValue'];
			$debug_string +="\nMiddleName_FieldValue="+UserData['MiddleName_FieldValue'];
			$debug_string +="\nFirstSurname_FieldValue="+UserData['FirstSurname_FieldValue'];
			$debug_string +="\nSecondSurname_FieldValue="+UserData['SecondSurname_FieldValue'];
			$debug_string +="\nEmail_FieldValue="+UserData['Email_FieldValue'];
			$debug_string +="\nPhone_FieldValue="+UserData['Phone_FieldValue'];
			$debug_string +="\nCompanyID_FieldValue="+UserData['CompanyID_FieldValue'];
			$debug_string +="\nUserGroup_FieldValue="+UserData['UserGroup_FieldValue'];			
			$debug_string +="\nStatus_FieldValue="+UserData['Status_FieldValue'];		
			
			//alert("(DEBUG)Function ReadUserFields() executed. Results:"+$debug_string); //(DEBUG)
			
		
		}
		//end of function
		
		
		//function to return user search string, based on patient inout fields
		function CreateUserSearchString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectUser";
		
			if(UserData.UserID_FieldValue !=="NONE"){
				URL+="&UserID_Token="+UserData.UserID_FieldValue;
			}

			if(UserData.Forename_FieldValue !=="NONE"){
				URL+="&Forename_Token="+UserData.Forename_FieldValue;
			}

			if(UserData.MiddleName_FieldValue !=="NONE"){
				URL+="&MiddleName_Token="+UserData.Forename_FieldValue;
			}			
			
			if(UserData.FirstSurname_FieldValue !=="NONE"){
				URL+="&FirstSurname_Token="+UserData.FirstSurname_FieldValue;
			}

			if(UserData.SecondSurname_FieldValue !=="NONE"){
				URL+="&SecondSurname_Token="+UserData.SecondSurname_FieldValue;
			}

			if(UserData.Phone_FieldValue !=="NONE"){
				URL+="&Phone_Token="+UserData.Phone_FieldValue;
			}

			if(UserData.Email_FieldValue !=="NONE"){
				URL+="&Email_Token="+UserData.PatientEmail_FieldValue;
			}

			if(UserData.CompanyID_FieldValue !=="NONE"){
				URL+="&CompanyID_Token="+UserData.CompanyID_FieldValue;
			}
			
			if(UserData.Status_FieldValue !=="NONE"){
				URL+="&Status_Token="+UserData.Status_FieldValue;
			}

			if(UserData.UserGroup_FieldValue !=="NONE"){
				URL+="&UserGroup_Token="+UserData.UserGroup_FieldValue;
			}
			
			//alert("(DEBUG)CreateUserSearchString()-ending.URL="+URL);
			return URL;
			
		}
		//eof

		//function to return user search string, based on patient inout fields
                //within same company
		function CreateUserWithinSameCompanySearchString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectUser";
		
			if(UserData.UserID_FieldValue !=="NONE"){
				URL+="&UserID_Token="+UserData.UserID_FieldValue;
			}

			if(UserData.Forename_FieldValue !=="NONE"){
				URL+="&Forename_Token="+UserData.Forename_FieldValue;
			}

			if(UserData.MiddleName_FieldValue !=="NONE"){
				URL+="&MiddleName_Token="+UserData.Forename_FieldValue;
			}			
			
			if(UserData.FirstSurname_FieldValue !=="NONE"){
				URL+="&FirstSurname_Token="+UserData.FirstSurname_FieldValue;
			}

			if(UserData.SecondSurname_FieldValue !=="NONE"){
				URL+="&SecondSurname_Token="+UserData.SecondSurname_FieldValue;
			}

			if(UserData.Phone_FieldValue !=="NONE"){
				URL+="&Phone_Token="+UserData.Phone_FieldValue;
			}

			if(UserData.Email_FieldValue !=="NONE"){
				URL+="&Email_Token="+UserData.PatientEmail_FieldValue;
			}
                        URL+="&CompanyID_Token="+URLParams.ID;
			
			if(UserData.Status_FieldValue !=="NONE"){
				URL+="&Status_Token="+UserData.Status_FieldValue;
			}

			if(UserData.UserGroup_FieldValue !=="NONE"){
				URL+="&UserGroup_Token="+UserData.UserGroup_FieldValue;
			}
			
			//alert("(DEBUG)CreateUserSearchString()-ending.URL="+URL);
			return URL;
			
		}
		//eof                
                
		//function to return string to delete patient, by patient ID (taken from URL)
		function CreateUserDeleteStringByID(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=DeleteUser";
			URL+="&UserID_Token="+URLParams.ID;
			//alert("(DEBUG)CreateUserDeleteStringByID() executed. Return URL="+URL);
			return URL;
			
		}
		//eof

		//function to generate URL string to insert patient into dB
		//returns the URL
		function CreateUserInsertString(){
			
			//alert("(DEBUG)CreateUserInsertString()-starting");			
			var URL = "../engine/dBInterface.php?";
			URL += "ActionDBToken=InsertUser";			
			URL += "&UserID_Token="+UserData.UserID_FieldValue;
			URL += "&Forename_Token="+UserData.Forename_FieldValue;
			URL += "&MiddleName_Token="+UserData.MiddleName_FieldValue;
			URL += "&FirstSurname_Token="+UserData.FirstSurname_FieldValue;
			URL += "&SecondSurname_Token="+UserData.SecondSurname_FieldValue;
			URL += "&Email_Token="+UserData.Email_FieldValue;
			URL += "&Phone_Token="+UserData.Phone_FieldValue;
			URL += "&CompanyID_Token="+UserData.CompanyID_FieldValue;
			URL += "&UserGroup_Token="+UserData.UserGroup_FieldValue;
			//URL += "&PassHash_Token="+UserData.PassHash_FieldValue;

			if(UserData.Status_FieldValue ==="active" || UserData.Status_FieldValue ==="inactive" ){
				URL += "&Status_Token="+UserData.Status_FieldValue;
			}
                        
			alert("(DEBUG)CreateUserInsertString()-ending.URL="+URL);
			return URL;
			
		}
		//eof
		
		//function to return the URL string to update user profile data
		//it uses URLParams.ID global to select user
		function CreateUserEditString_old(){
			
			var URL = "../engine/dBInterface.php";
			URL+="?UserID_Token="+URLParams.ID;
			
			if(UserData.Forename_FieldValue !=="NONE"){
				URL+="&Forename_Token="+UserData.Forename_FieldValue;
			}

			if(UserData.MiddleName_FieldValue !=="NONE"){
				URL+="&MiddleName_Token="+UserData.MiddleName_FieldValue;
			}
			
			if(UserData.FirstSurname_FieldValue !=="NONE"){
				URL+="&FirstSurname_Token="+UserData.FirstSurname_FieldValue;
			}

			if(UserData.SecondSurname_FieldValue !=="NONE"){
				URL+="&SecondSurname_Token="+UserData.SecondSurname_FieldValue;
			}

			if(UserData.Phone_FieldValue !=="NONE"){
				URL+="&Phone_Token="+UserData.Phone_FieldValue;
			}

			if(UserData.Email_FieldValue !=="NONE"){
				URL+="&Email_Token="+UserData.Email_FieldValue;
			}

			if(UserData.CompanyID_FieldValue !=="NONE"){
				URL+="&CompanyID_Token="+UserData.CompanyID_FieldValue;
			}

			if(UserData.UserGroup_FieldValue !=="NONE"){
				URL+="&UserGroup_Token="+UserData.UserGroup_FieldValue;
			}			
			
			if(UserData.Status_FieldValue ==="active" || UserData.Status_FieldValue ==="inactive"){
				URL+="&Status_Token="+UserData.Status_FieldValue;
			}			

                        //status, usergroup and company are specific for very userID/rowID
                        if(UserData.Status_FieldValue !=="NONE" || UserData.UserGroup_FieldValue !=="NONE" || UserData.CompanyID_FieldValue !=="NONE"){
                            
                            URL+="&RowID_Token="+URLParams.RowID;
                            URL+="&ActionDBToken=UpdateUser";
                        }else{
                            URL+="&ActionDBToken=UpdateUser_byUserID";
                        }
                        
			alert("(DEBUG)CreatePatientEditString()-ending.URL="+URL);
			return URL;
			
		}
		//eof

                //function to generate update url for users <personal data>, excluding ug, company and status
                //mode=personal, role
                function CreateUserEditString(mode){
                    
                    var URL = "../engine/dBInterface.php";
                    URL+="?UserID_Token="+URLParams.ID;
                    
                    if(mode==="personal"){
                        
                        URL+="&ActionDBToken=UpdateUser_byUserID";//will update ALL linked users

			if(UserData.Forename_FieldValue !=="NONE"){
				URL+="&Forename_Token="+UserData.Forename_FieldValue;
			}

			if(UserData.MiddleName_FieldValue !=="NONE"){
				URL+="&MiddleName_Token="+UserData.MiddleName_FieldValue;
			}
			
			if(UserData.FirstSurname_FieldValue !=="NONE"){
				URL+="&FirstSurname_Token="+UserData.FirstSurname_FieldValue;
			}

			if(UserData.SecondSurname_FieldValue !=="NONE"){
				URL+="&SecondSurname_Token="+UserData.SecondSurname_FieldValue;
			}

			if(UserData.Phone_FieldValue !=="NONE"){
				URL+="&Phone_Token="+UserData.Phone_FieldValue;
			}

			if(UserData.Email_FieldValue !=="NONE"){
				URL+="&Email_Token="+UserData.Email_FieldValue;
			}                        

                        alert("(DEBUG)CreatePatientEditString() executed,mode="+mode+",URL="+URL);
                        return URL;
                        
                    }//eo personal mode
                    else if(mode==="role"){
                        
                        URL+="&ActionDBToken=UpdateUser";
                        URL+="&RowID_Token="+URLParams.RowID;
                          
                        
			if(UserData.CompanyID_FieldValue !=="NONE"){
				URL+="&CompanyID_Token="+UserData.CompanyID_FieldValue;
			}

			if(UserData.UserGroup_FieldValue !=="NONE"){
				URL+="&UserGroup_Token="+UserData.UserGroup_FieldValue;
			}			
			
			if(UserData.Status_FieldValue ==="active" || UserData.Status_FieldValue ==="inactive" ){
				URL+="&Status_Token="+UserData.Status_FieldValue;
			}                        
                        
                        alert("(DEBUG)CreatePatientEditString() executed,mode="+mode+",URL="+URL);
                        return URL;
                        
                    }                   
                    //eo role mode
                    else {
                        
                        alert("(DEBUG)CreatePatientEditString() execute with invalid mode="+mode+",URL="+URL);
                        return URL;
                    }//invalid mode
                    
                }
                //eof



                //function to add new Company/Rol to existent user
                function CreateAddPermissionString(){
                    
                        var URL = "../engine/dBInterface.php?ActionDBToken=InsertUserPermission&UserID_Token="+URLParams.ID;
                        
                        
			if(UserData.CompanyID_FieldValue !=="NONE"){
				URL+="&CompanyID_Token="+UserData.CompanyID_FieldValue;
			}

			if(UserData.UserGroup_FieldValue !=="NONE"){
				URL+="&UserGroup_Token="+UserData.UserGroup_FieldValue;
			}	                    
                        
                              
                        /*
			if(UserData.Forename_FieldValue !=="NONE"){
				URL+="&Forename_Token="+UserData.Forename_FieldValue;
			}                        
                        
			if(UserData.MiddleName_FieldValue !=="NONE"){
				URL+="&MiddleName_Token="+UserData.MiddleName_FieldValue;
			}  
                        
			if(UserData.FirstSurname_FieldValue !=="NONE"){
				URL+="&FirstSurname_Token="+UserData.FirstSurname_FieldValue;
			}   

			if(UserData.SecondSurname_FieldValue !=="NONE"){
				URL+="&SecondSurname_Token="+UserData.SecondSurname_FieldValue;
			}   
                        
			if(UserData.Email_FieldValue !=="NONE"){
				URL+="&Email_Token="+UserData.Email_FieldValue;
			}
                        
			if(UserData.Phone_FieldValue !=="NONE"){
				URL+="&Email_Token="+UserData.Phone_FieldValue;
			}                        
                        */
                        
                        //alert("(DEBUG)CreateAddPermissionString() return URL="+URL);
                        return URL;
                        
                        /*
			URL += "&Forename_Token="+UserData.;
			URL += "&MiddleName_Token="+UserData.;
			URL += "&FirstSurname_Token="+UserData.;
			URL += "&SecondSurname_Token="+UserData.;
			URL += "&Email_Token="+UserData.;
			URL += "&Phone_Token="+UserData.;
			URL += "&CompanyID_Token="+UserData.CompanyID_FieldValue;
			URL += "&UserGroup_Token="+UserData.UserGroup_FieldValue;
                        */
                }
                //eof
	
	
		//validating input field to prevent the user to enter invalid words or chars
		//returns true is field value is valid
		//forbidden substring: ADD, ALTER, AND, CREATE, DELETE, DROP,  EXISTS, IF, INSERT, LIKE, OR, SELECT, UNION, UPDATE, WHERE
 		//forbidden characters: <>@¡!#$%^&*()_+[]{}¿?:;|'\"\\,./~`¨-=ñáéúóíàèìòùäëïöüâêîôû
		function CheckInputField(field_value,field_type){			
		
			//alert("(DEBUG)CheckInputField() - executing on value="+field_value+", type="+field_type);
			
			var specialChars = "<>@¡!#$%¬^&*()_+[]{}¿?:;|'\"\\,./~`¨-=ñáéúóíàèìòùäëïöüâêîôû";//default
			
			if(field_type=="email"){
				specialChars = "<>¡!#$%¬^&*()+[]{}¿?:;|'\"\\,/~`¨=ñáéúóíàèìòùäëïöüâêîôû";
			}else if(field_type=="date"){
				specialChars = "<>@¡!#$%¬^&*()_+[]{}¿?:;|'\"\\,.~`¨=ñáéúóíàèìòùäëïöüâêîôû";
			}else{
				specialChars = "<>@¡!#$%¬^&*()_+[]{}¿?:;|'\"\\,./~`¨-=ñáéúóíàèìòùäëïöüâêîôû";
			}
			
			//var temp = $scope[field_value]; 
			var temp = field_value;
			//alert("(DEBUG)CheckInputField() - looking for forbidden words="+temp);
			

				//looking for fobidden words
				if(temp.indexOf('add')!=-1){
					return false;
					//alert("(DEBUG)CheckInputField() - looking for <add>")		
				}else if(temp.indexOf('alter ')!=-1){
					return false;
				}else if(temp.indexOf(' and ')!=-1){
					return false;				
				}else if(temp.indexOf('create ')!=-1){
					return false;
				}else if(temp.indexOf('delete ')!=-1){
					return false;
				}else if(temp.indexOf('drop ')!=-1){
					return false;
				}else if(temp.indexOf('exist ')!=-1){
					return false;
				}else if(temp.indexOf('if ')!=-1){
					return false;
				}else if(temp.indexOf('insert ')!=-1){
					return false;
				}else if(temp.indexOf('like ')!=-1){
					return false;
				}else if(temp.indexOf(' or ')!=-1){
					return false;
				}else if(temp.indexOf('select ')!=-1){
					return false;
				}else if(temp.indexOf('union ')!=-1){
					return false;
				}else if(temp.indexOf('update ')!=-1){
					return false;
				}else if(temp.indexOf('where ')!=-1){
					return false;
				}else if(temp.indexOf(' ')!=-1){
					return false;			
				}else{ 
					//looking for forbidden chars
					//alert("(DEBUG)CheckInputField() - looking for forbidden chars");
					for(i = 0; i < specialChars.length;i++){
							if(temp.indexOf(specialChars[i]) > -1){
								//alert("(DEBUG)CheckInputField()-detecting invalid char="+specialChars[i]+".Returning FALSE");
								return false;
							}
					}
					//alert("(DEBUG)CheckInputField()-executed. Returning TRUE");	
					return true;
				}

		} 
		//eof

		//FIXME: add password check
		//function to validate patient input data in HTML fields
		//returns true if everything is valid, otherwise false
		function CheckUserInputData(){	
			
			//alert("(DEBUG)CheckUserInputData() - starting"  );
			
			if(CheckInputField(UserData.Forename_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en Nombre");
				return false;
			}else if(CheckInputField(UserData.MiddleName_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en Segundo Nombre");
				return false;
			}else if(CheckInputField(UserData.FirstSurname_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en Primer Apellido");
				return false;
			}else if(CheckInputField(UserData.SecondSurname_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en Segundo Apellido");
				return false;
			}else if(CheckInputField(UserData.Email_FieldValue,"email")==false){
				//alert("ERROR - Entrada invalida en Email");
				return false;
			}else if(1==10){
			//	//alert("ERROR - Entrada invalida en telefono");
			//FIXME: script failing when checking the phone number	
				return false;
			}else{
				//alert("(DEBUG)CheckUserInputData() - ending. Return TRUE"  );
				return true;				
			}
			
		}
		//eof

			
		//2. Create <user> Search string, by ID arg (taken from URL "ID" arg)
		// returns URL string
		function CreateUserSearchStringByID () {
			
			var URLstring = "../engine/dBInterface.php?ActionDBToken=SelectUser";
			URLstring+="&UserID_Token="+URLParams.ID;
                        URLstring+="&RowID_Token="+URLParams.RowID;
			//alert("(DEBUG)CreateUserSearchStringByID() - User Search String="+URLstring);
			return URLstring;
			
		};
		//end of function


                //create string to list all flagged-for-delete users
                function CreateFFDUSearchString(){

                    var URL = "../engine/dBInterface.php?ActionDBToken=ListFFDUser";
                    alert("(DEBUG)CreateFFDUSearchString() executed. Return="+URL);
                    return URL;                   
                    
                }
                //eof


		//function to create user pass generation url
		function CreateUserPWDString(){
			
			var URL="../engine/dBInterface.php?ActionDBToken=SetUserPWD";
			URL+="&UserID="+URLParams.ID;
			return URL;
			
		}
		//eof

                //function to create string for FFD user action
                function CreateFFDUserString(){
                    
                    var URL="../engine/dBInterface.php?ActionDBToken=FFDUser";
                    URL+="&UserID_Token="+URLParams.ID+"&RowID_Token="+URLParams.RowID;
                    alert("(DEBUG)CreateFFDUserString() executed - Return URL="+URL);
                    return URL;
                }
                //eof
                
                function Redirect($URL){
                    
                    window.location = $URL;
                }
                
		
		//function to search patient by ID, Surname, Forename, Company, etc
		//intended to be called from HTML
		$scope.SearchUser = function(){
			
			//alert ("(DEBUG)-SearchPatient() - starting");
			ResetUserFieldValues();
			ReadUserFields();		
			CalldBEngine(CreateUserSearchString(),"data");
			//alert ("(DEBUG)-SearchPatient() - executed");			
		}
		//eof

		//function to search patient by ID, Surname, Forename, etc
                //within same company
		//intended to be called from HTML
		$scope.SearchUserWithinSameCompany = function(){
			
			//alert ("(DEBUG)-SearchPatient() - starting");
			ResetUserFieldValues();
			ReadUserFields();		
			CalldBEngine(CreateUserWithinSameCompanySearchString(),"data");
			//alert ("(DEBUG)-SearchPatient() - executed");			
		}
		//eof

                
		//general function to introduce a new patient in dB	
		$scope.CreateUser = function() {			
			
			//alert ("(DEBUG)-CreateUser() - starting");
			ReadUserFields();		
			
			if (CheckUserInputData()==true){
				//alert("(DEBUG)CreatePatient()-Input data is right");
                                //CreateUserInsertString();//for debug
				CalldBEngine(CreateUserInsertString(),"data");
			}else{
				//alert("ERROR - datos invalidos");				
			}
			//alert ("(DEBUG)-CreateUser() - executed");
		}
		//eof	

                $scope.Logout = function(){
                    
                    var URL = "../engine/dBInterface.php?ActionDBToken=Logout";
                    //alert("(DEBUG)Logout()-Logging off");
                    CalldBEngine(URL,"data");
                    Redirect("../index/login.html");
                    
                }
                //eof
                
                
                
		//function to store updated company into dB
		$scope.EditUser = function(){
			
			//alert("(DEBUG) EditPatient() - starting");
			ReadUserFields();			
			//CalldBEngine(CreateUserEditString(),"data");
                        CalldBEngine(CreateUserEditString("personal"),"data");
                        CalldBEngine(CreateUserEditString("role"),"data");
		}
		//eof

               
		//FIXME: convert to user
		//function to delete patient. Intended to be called from HTML page
		//no return
		$scope.DeletePatient = function(){
			
			//alert("(DEBUG)DeletePatient() - starting");
			CalldBEngine(CreatePatientDeleteStringByID(),"data");
			//alert("(DEBUG)DeletePatient() - executed");
		}
		//eof
                
                //function to add new company/role to existent user
                $scope.InsertRole = function(){
                    
                    ReadUserFields();
                    CalldBEngine(CreateAddPermissionString(),"RoleData");
                    
                }
		//eof
                
		//function to generate user password
		
		$scope.GeneratePassword= function(){
			
			//FIXME: add content
			
		}//eof

                //function to flag user for delete
                $scope.FFDUser= function(){
                    
                    CalldBEngine(CreateFFDUserString(),"FDD_Data");
                    
                }               
		//eof

                //function to send string with users that will be flagged for delete
                $scope.FlagForDeletionUsers = function(){
                    
                    alert("(DEBUG) FlagForDeleteUsers ");
                    $scope.UserIDArray2 = [];
                    var UserSelector="";


                    //$scope.UserIDArray.push("("); 
                    angular.forEach($scope.data, function(users){
                            
                        UserSelector+=users.RowID+"."+users.UserID;  
                        if (!!users.ffdu){
                            $scope.UserIDArray2.push(UserSelector);
                            
                        }
                        UserSelector="";
                    })                    
                    //$scope.UserIDArray.push(")");
                    
                     
                    var URL = "../engine/dBInterface.php?ActionDBToken=FFDUserList";
                    URL+="&IDs="+$scope.UserIDArray2.toString();
                    
                    CalldBEngine(URL,"any_data");
                    sleep(1000);
                    $scope.SearchUserWithinSameCompany();
                    //alert("(DEBUG)FlagForDeleteUsers() executed. user IDs array="+$scope.UserIDArray2);
                    alert("(DEBUG)FlagForDeleteUsers() executed. URL="+URL);    
                    
                }
                //eof
                
                //function to send string with users that will be flagged for delete
                $scope.UnFlagForDeletionUsers = function(){
                    
                    alert("(DEBUG) UnFlagForDeleteUsers ");
                    $scope.UserIDArray3 = [];
                    var UserSelector="";


                    //$scope.UserIDArray.push("("); 
                    angular.forEach($scope.data, function(users){
                            
                        UserSelector=users.RowID+"."+users.UserID;  
                        if (!!users.ffdu){
                            $scope.UserIDArray3.push(UserSelector);
                            
                        }
                        UserSelector="";
                        
                    })                    
                    //$scope.UserIDArray.push(")");
                    
                     
                    var URL = "../engine/dBInterface.php?ActionDBToken=UFFDUserList";
                    URL+="&IDs="+$scope.UserIDArray3.toString();
                    
                    CalldBEngine(URL,"any_data");
                    
                    sleep(1000);
                    $scope.SearchUserWithinSameCompany();
                    //alert("(DEBUG)FlagForDeleteUsers() executed. user IDs array="+$scope.UserIDArray3);
                    alert("(DEBUG)FlagForDeleteUsers() executed. URL="+URL);    
                    
                }
                //eof
                
                //function to create a delay
                function sleep(milliseconds) {
                    var start = new Date().getTime();
                    for (var i = 0; i < 1e7; i++) {
                      if ((new Date().getTime() - start) > milliseconds){
                        break;
                      }
                    }
                  }
                //eof    

                //function to send string with confirmation of Users that will be deleted
                $scope.ConfirmFFDUser = function(){
                    
                    //alert("(DEBUG) ConfirmFFDUser() ");
                    $scope.UserIDArray = [];
                    var UserSelector="";


                    //$scope.UserIDArray.push("("); 
                    angular.forEach($scope.FFDU_data, function(users){
                            
                        UserSelector="("+users.RowID+","+users.UserID+")";  
                        if (!!users.selected){
                            $scope.UserIDArray.push(UserSelector);
                            UserSelector+=",";
                        }
                        
                    })                    
                    //$scope.UserIDArray.push(")");
                    
                     
                    var URL = "../engine/dBInterface.php?ActionDBToken=DeleteUser";
                    URL+="&UserIDArray_Token="+$scope.UserIDArray.toString();
                    
                    CalldBEngine(URL,"DeletedUser_data");
                    
                    //alert("(DEBUG)ConfirmFFDUser() executed. userID array="+$scope.UserIDArray);
                    alert("(DEBUG)ConfirmFFDUser() executed. URL="+URL);    
                    
                }
                //eof

		/*5. Function to read vars from URL string
		intended to get "Action" and "ID" for patients and companies
		Its called this way:		var first = getUrlVars()["Action"]; var second = getUrlVars()["ID"];*/
		function getUrlVars() {
			
			
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
			});
			return vars;
			
		}
		
		//7.3 Function to call php server file, in $address
		//FIXME: add the .error part
		function CalldBEngine(URLstring,OutputType) {			
			
			
			//alert("(DEBUG)Function CallPHPServerFile() calling"); //(DEBUG)			
			$http.get(URLstring)
			.success(function(data){
				
			if(OutputType=="CompanyList"){	
				$scope.CompanyList = data; //companyID list from mySQL
			}else if (OutputType=="FFDU_data"){
                                $scope.FFDU_data = data;
                        }else if(OutputType=="data"){
				$scope.data=data;
			}
			
			})
			
			//alert("(DEBUG)Function CalldBEngine() executed on URL="+URLstring); //(DEBUG)

		}
		//eof		

		
		//FIXME: convert to user
		//8. Function to check if Patient has been succesfully created into database
		//returns TRUE if patient do exists
		function CheckIfPatientExists(){
			
			
			return true;
		}
		//eof
		
		
		//function to read from dB all company list
		function ReadCompanyList(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=ListCompany";
			CalldBEngine(URL,"CompanyList");
						
		}
		//eof
		
		
		//8. Init Function to call Main with parameter Type
		$scope.Init = function(Type) {
			Main(Type);			
		}
		
		
		//debug function
		$scope.dg = function(){
                    
                    

		}
		
		//debug function for company
		$scope.dg_user = function(){
                    
			alert("(DEBUG) Starting Debug function(user)");
                        $scope.UserIDArray = [];
                        var UserSelector="";


                        angular.forEach($scope.FFDU_data, function(users){
                            
                          UserSelector="("+users.RowID+","+users.UserID+"),";  
                            
                          if (!!users.selected) $scope.UserIDArray.push(UserSelector);
                        })                    
                        
                        alert("userid array="+$scope.UserIDArray);
                        
			//ReadCompanyFields();
			//CreateCompanyEditString();
			
			//CheckURLParameters();
			//CallPHPServerFile(CreateCompanySearchStringByURL());
						
			/*
			ReadCompanyFields();
			CheckCompanyInputData();
			CreateCompanyInsertString();
			*/
			
			//alert("(DEBUG)  Ending Debug function(Company)");
                        
                        //var id = "";
                        //var id = $scope.SelectData.User.UserID;
                        //alert("(DEBUG)-user id="+id);
                       //alert("dg ending") 

		}
		

		//FIXME: convert to user
		//9. MAIN function to execute scripts
		// Arg Type="Patient" or "Company". Its set by HTML controller tag
		// return true if succesfully executed
		function Main (Type) {	
			
			//alert("(DEBUG)Main()-starting with Type="+Type);
			
			CalldBEngine("../engine/dBInterface.php?ActionDBToken=ListCompany","CompanyList");
			
			//check parameters
			if(CheckURLParameters()==true){
				
				if(Type=='User' && URLParams.Action=="EditUser"){
					
					CalldBEngine(CreateUserSearchStringByID(),"data");
					return true;
                                        
				}else if(Type=='User' && URLParams.Action=="ListFFDUser"){
					
                                        //alert("Listing FFD users");
					CalldBEngine(CreateFFDUSearchString(),"FFDU_data");
					return true;
				}
                                
                                
                                
                                
				
			}else{
				//failed the URL args validation
				//FIXME: redirect to other default address
				return false;
			}
					
			
		} 	
		
	
	//---------------END OF FUNCT DEF-------------------------
	
	//---------------Executing Script
	//Main('Patient');
	
	
}]);