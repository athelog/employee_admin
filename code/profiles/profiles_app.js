var fetch = angular.module('fetch', []);

	fetch.controller('dbCtrl', ['$scope', '$http', function ($scope, $http) {
		
		//------------1. USER CONST -----------------------
		var GeneralGlobals ={};
		GeneralGlobals['DebugFlag']="NONE"; //NONE, TRUE,
		
		
		//------------2. PROGRAM VARS (DON'T TOUCH) -------
		
		//alert("(DEBUG)Welcome to profile screen v1.59");
		
		//globals to hide Patient/Company text
		//FIXME:check if this is really required
		$scope.ShowPatientSection = true;
		$scope.ShowCompanySection = true;
	
		//to read values from HTML <patient> search fields
		var PatientData = {};		
		PatientData['PatientID_FieldValue']="NONE";//
		PatientData['Forename_FieldValue']="NONE";//
                PatientData['MiddleName_FieldValue']="NONE";//
		PatientData['FirstSurname_FieldValue']="NONE";//
		PatientData['SecondSurname_FieldValue']="NONE";//
		PatientData['PatientPhone_FieldValue']="NONE";//
		PatientData['PatientEmail_FieldValue']="NONE";//
		PatientData['CompanyID_FieldValue']="NONE";//
		PatientData['Site_FieldValue']="NONE";//site
		PatientData['Department_FieldValue']="NONE";//department
		PatientData['BirthDate_FieldValue']="NONE";
		PatientData['JoinDate_FieldValue']="NONE";
		PatientData['Gender_FieldValue']="NONE";
		PatientData['PatientAddress_FieldValue']="NONE";
                PatientData['Income_FieldValue']="NONE";
		
                //to read value from HTML <Department> create field
                var DepartmentData = {};
                DepartmentData['DepartmentID']="NONE";
                DepartmentData['DepartmentIDtoDelete']="NONE";
                
		//to read values from HTML <Company> search fields
		var CompanyData = {};		
		CompanyData['CompanyID2_FieldValue']="NONE";//
		CompanyData['CompanyEmail_FieldValue']="NONE";//
		CompanyData['CompanyPhone_FieldValue']="NONE";//
		CompanyData['Address_FieldValue']="NONE";//

		//to read URL params var
		var URLParams = {};
		URLParams['Action'] = "NONE";
		URLParams['ID'] = "NONE";
		URLParams['Message'] = "NONE";
		
		//to set permissions - must read from Login system
		//FIXME:read from login system
		$UserID="NONE";
		
		//modal vars
		$scope.Modal_Message = "NONE"; //message to display in modal
		$scope.IsThereChanges = "FALSE"; //is there any changes in fields?
	
		
		//for debug - works
		var conn = {};
		conn["name"] = 'Fred';
		
		
	
		//-------------2. FUNCTIONS-----------------------------
		
		
		
		
		
		//0.Resetting patient values read from input text fields
		function ResetPatientFieldValues(){			
			
			PatientData.PatientID_FieldValue="NONE";//
			PatientData.Forename_FieldValue="NONE";//
                        PatientData.MiddleName_FieldValue="NONE";//
			PatientData.FirstSurname_FieldValue="NONE";//
			PatientData.SecondSurname_FieldValue="NONE";//
			PatientData.PatientPhone_FieldValue="NONE";//
			PatientData.PatientEmail_FieldValue="NONE";//
			PatientData.CompanyID_FieldValue="NONE";//
			PatientData.Site_FieldValue="NONE";
			PatientData.Department_FieldValue="NONE";
			PatientData.BirthDate_FieldValue="NONE";
			PatientData.JoinDate_FieldValue="NONE";
			PatientData.Gender_FieldValue="NONE";
			PatientData.PatientAddress_FieldValue="NONE";			
			PatientData['Income_FieldValue']="NONE";	
		};
		//end of resetting
		
                //Resetting department value read from HTML input(s)
                function ResetDepartmentData(){
                   
                    DepartmentData['DepartmentID']="NONE";
                    DepartmentData['DepartmentIDtoDelete']="NONE";
                }
                //eof
                
		//Resetting company values read from input text fields
		function ResetCompanyFieldValues(){
			
			CompanyData.CompanyID2_FieldValue="NONE";//
			CompanyData.CompanyEmail_FieldValue="NONE";//
			CompanyData.CompanyPhone_FieldValue="NONE";//
			CompanyData.Address_FieldValue="NONE";//		
		}
		//eof
		
		
		//function to check parameters
		//returns 1 if params are valid, if invalid:0	(invalid=>params are NULL, NONE or undefined)	
		function CheckURLParameters(){	

			
			//vars to read URL parameters
			URLParams.Action=getUrlVars()["Action"];
			URLParams.ID=getUrlVars()["ID"];
			URLParams.Message=getUrlVars()["Message"];

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
		
		//function to determine if there are changes in profile
		//returns TRUE:there is one change
		function IsThereChanges(){
			
			if($scope.PatientID_FieldValue !== "NONE")return true;
			else if ($scope.Forename_FieldValue !== "NONE")return true;
			else if ($scope.FirstSurname_FieldValue !== "NONE")return true;
			else if ($scope.SecondSurname_FieldValue !== "NONE")return true;
			else if ($scope.PatientEmail_FieldValue !== "NONE")return true;
			else if ($scope.PatientPhone_FieldValue !== "NONE")return true;
			else if ($scope.JoinDate_FieldValue !== "NONE")return true;
			else if ($scope.Gender_FieldValue !== "NONE")return true;
			else if ($scope.CompanyID_FieldValue !== "NONE")return true;
			else if ($scope.Department_FieldValue !== "NONE")return true;
			else if ($scope.Site_FieldValue !== "NONE")return true;
			else return false;	
			
		}
		//eof
		
	
		
		//1. demo  function to increase a counter in index.html
		$scope.count = 0;
		$scope.myFunc = function() {
			$scope.count++;
		};
		
		
		//2. read search HTML <patient> input fields	
		//no return
		function ReadPatientFields() {			
			
			//alert("(DEBUG)ReadPatientFields() - starting");
			
			if (typeof $scope.PatientID_Input_Model !== 'undefined' && $scope.PatientID_Input_Model !== null && $scope.PatientID_Input_Model !== "") {
				PatientData['PatientID_FieldValue'] = $scope.PatientID_Input_Model;
			}else{
				PatientData['PatientID_FieldValue'] = "NONE";
			}
			
			
			if (typeof $scope.Forename_Input_Model !== 'undefined' && $scope.Forename_Input_Model !== null && $scope.Forename_Input_Model !== "") {
				PatientData['Forename_FieldValue'] = $scope.Forename_Input_Model.toLowerCase(); 				
			}else{
				PatientData['Forename_FieldValue'] = "NONE";
			}

			if (typeof $scope.MiddleName_Input_Model !== 'undefined' && $scope.MiddleName_Input_Model !== null && $scope.MiddleName_Input_Model !== "") {
				PatientData['MiddleName_FieldValue'] = $scope.MiddleName_Input_Model.toLowerCase(); 				
			}else{
				PatientData['MiddleName_FieldValue'] = "NONE";
			}
                        
			if (typeof $scope.FirstSurname_Input_Model!== 'undefined' && $scope.FirstSurname_Input_Model !== null && $scope.FirstSurname_Input_Model !== "") {
				PatientData['FirstSurname_FieldValue']= $scope.FirstSurname_Input_Model.toLowerCase(); 
			}else{
				PatientData['FirstSurname_FieldValue'] = "NONE";
			}
			
			if (typeof $scope.SecondSurname_Input_Model !== 'undefined' && $scope.SecondSurname_Input_Model !== null && $scope.SecondSurname_Input_Model !== "") {
				PatientData['SecondSurname_FieldValue'] = $scope.SecondSurname_Input_Model.toLowerCase(); 
			}else{
				PatientData['SecondSurname_FieldValue'] = "NONE";
			}
			
			if (typeof $scope.PatientEmail_Input_Model !== 'undefined' && $scope.PatientEmail_Input_Model !== null && $scope.PatientEmail_Input_Model !== "") {
				PatientData['PatientEmail_FieldValue'] = $scope.PatientEmail_Input_Model.toLowerCase(); 
			}else{
				PatientData['PatientEmail_FieldValue'] = "NONE";
			}		
			
			if (typeof $scope.PatientPhone_Input_Model !== 'undefined' && $scope.PatientPhone_Input_Model !== null && $scope.PatientPhone_Input_Model !== "") {
				PatientData['PatientPhone_FieldValue'] = $scope.PatientPhone_Input_Model; 
			}else{
				PatientData['PatientPhone_FieldValue'] = "NONE";
			}				
			
			if (typeof $scope.BirthDate_Input_Model !== 'undefined' && $scope.BirthDate_Input_Model !== null && $scope.BirthDate_Input_Model !== "") {
				PatientData['BirthDate_FieldValue'] = $scope.BirthDate_Input_Model; 
			}else{
				PatientData['BirthDate_FieldValue'] = "NONE";
			}	

			if (typeof $scope.JoinDate_Input_Model !== 'undefined' && $scope.JoinDate_Input_Model !== null && $scope.JoinDate_Input_Model !== "") {
				PatientData['JoinDate_FieldValue'] = $scope.JoinDate_Input_Model; 
			}else{
				PatientData['JoinDate_FieldValue'] = "NONE";
			}
						
			if (typeof $scope.GenderSelect_Input_Model !== 'undefined' && $scope.GenderSelect_Input_Model !== null && $scope.GenderSelect_Input_Model !== "") {
				PatientData['Gender_FieldValue'] = $scope.GenderSelect_Input_Model; 
			}else{
				PatientData['Gender_FieldValue'] = "NONE";
			}

			if (typeof $scope.CompanySelect_Input_Model !== 'undefined' && $scope.CompanySelect_Input_Model !== null && $scope.CompanySelect_Input_Model !== "") {
				PatientData['CompanyID_FieldValue'] = $scope.CompanySelect_Input_Model.CompanyID; 
			}else{
				PatientData['CompanyID_FieldValue'] = "NONE";
			}			
			
			if (typeof $scope.DepartmentSelect_Input_Model !== 'undefined' && $scope.DepartmentSelect_Input_Model !== null && $scope.DepartmentSelect_Input_Model !== "") {
				PatientData['Department_FieldValue'] = $scope.DepartmentSelect_Input_Model; 
			}else{
				PatientData['Department_FieldValue'] = "NONE";
			}			
			
			if (typeof $scope.SiteSelect_Input_Model !== 'undefined' && $scope.SiteSelect_Input_Model !== null && $scope.SiteSelect_Input_Model !== "") {
				PatientData['Site_FieldValue'] = $scope.SiteSelect_Input_Model; 
			}else{
				PatientData['Site_FieldValue'] = "NONE";
			}

			if (typeof $scope.PatientAddress_Input_Model !== 'undefined' && $scope.PatientAddress_Input_Model !== null && $scope.PatientAddress_Input_Model !== "") {
				PatientData['PatientAddress_FieldValue'] = $scope.PatientAddress_Input_Model; 
			}else{
				PatientData['PatientAddress_FieldValue'] = "NONE";
			}
			
			if (typeof $scope.PatientIncome_Input_Model !== 'undefined' && $scope.PatientIncome_Input_Model !== null && $scope.PatientIncome_Input_Model !== "") {
				PatientData['Income_FieldValue'] = $scope.PatientIncome_Input_Model; 
			}else{
				PatientData['Income_FieldValue'] = "NONE";
			}
                        
			$debug_string = "\nPatientID_FieldValue="+PatientData['PatientID_FieldValue'];
			$debug_string +="\nForename_FieldValue="+PatientData['Forename_FieldValue'];
			$debug_string +="\nFirstSurname_FieldValue="+PatientData['FirstSurname_FieldValue'];
			$debug_string +="\nSecondSurname_FieldValue="+PatientData['SecondSurname_FieldValue'];
			$debug_string +="\nPatientEmail_FieldValue="+PatientData['PatientEmail_FieldValue'];
			$debug_string +="\nPatientPhone_FieldValue="+PatientData['PatientPhone_FieldValue'];
			$debug_string +="\nBirthDate_FieldValue="+PatientData['BirthDate_FieldValue'];
			$debug_string +="\nJoinDate_FieldValue="+PatientData['JoinDate_FieldValue'];
			$debug_string +="\nGender_FieldValue="+PatientData['Gender_FieldValue'];
			$debug_string +="\nCompanyID_FieldValue="+PatientData['CompanyID_FieldValue'];
			$debug_string +="\nDepartment_FieldValue="+PatientData['Department_FieldValue'];
			$debug_string +="\nSite_FieldValue="+PatientData['Site_FieldValue'];
                        $debug_string +="\Income="+PatientData['Income_FieldValue'];
			
			//alert("(DEBUG)Function ReadPatientFields() executed. Results:"+$debug_string); //(DEBUG)
			
		
		}
		//end of function
		
	
		//2. read search HTML input fields	
		function ReadCompanyFields () {
				
			//alert("(DEBUG)ReadCompanyFields()- starting");	
			
			if (typeof $scope.CompanyID2_Input_Model !== 'undefined' && $scope.CompanyID2_Input_Model !== null && $scope.CompanyID2_Input_Model !== "") {
				CompanyData.CompanyID2_FieldValue = $scope.CompanyID2_Input_Model; 
			}else{
				CompanyData.CompanyID2_FieldValue = "NONE";
			}
			
			if (typeof $scope.CompanyEmail_Input_Model !== 'undefined' && $scope.CompanyEmail_Input_Model !== null && $scope.CompanyEmail_Input_Model !== "") {
				CompanyData.CompanyEmail_FieldValue = $scope.CompanyEmail_Input_Model; 
			}else{
				CompanyData.CompanyEmail_FieldValue = "NONE";
			}

			if (typeof $scope.CompanyPhone_Input_Model !== 'undefined' && $scope.CompanyPhone_Input_Model !== null && $scope.CompanyPhone_Input_Model !== "") {
				CompanyData.CompanyPhone_FieldValue = $scope.CompanyPhone_Input_Model; 
			}else{
				CompanyData.CompanyPhone_FieldValue = "NONE";
			}
			
			if (typeof $scope.CompanyAddress_Input_Model !== 'undefined' && $scope.CompanyAddress_Input_Model !== null && $scope.CompanyAddress_Input_Model !== "") {
				CompanyData.Address_FieldValue = $scope.CompanyAddress_Input_Model; 
			}else{
				CompanyData.Address_FieldValue = "NONE";
			}			
						
			$debug_string = "\nCompanyID2_FieldValue="+CompanyData.CompanyID2_FieldValue;
			$debug_string +="\nCompanyEmail_FieldValue="+CompanyData.CompanyEmail_FieldValue;
			$debug_string +="\nCompanyPhone_FieldValue="+CompanyData.CompanyPhone_FieldValue;
			$debug_string +="\nCompanyAddress_FieldValue="+CompanyData.Address_FieldValue;
			//alert("(DEBUG)ReadCompanyFields()-data="+$debug_string);
			
		}	
		//eof

                //function to read HTML input fields related to department creation
                function ReadDepartmentFields(){
                    
                    if (typeof $scope.Department_Input_Model !== 'undefined' && $scope.Department_Input_Model !== null && $scope.Department_Input_Model !== "") {
                        DepartmentData.DepartmentID = $scope.Department_Input_Model; 
                    }else{
                        DepartmentData.DepartmentID = "NONE";
                    }                    

                    if (typeof $scope.DepartmentSelectForDelete_Input_Model !== 'undefined' && $scope.DepartmentSelectForDelete_Input_Model !== null && $scope.DepartmentSelectForDelete_Input_Model !== "") {
                        DepartmentData.DepartmentIDtoDelete = $scope.DepartmentSelectForDelete_Input_Model.DepartmentID; 
                    }else{
                        DepartmentData.DepartmentIDtoDelete = "NONE";
                    }       

                    //alert("(DEBUG)ReadDepartmentFields() executed. \nDepartmentID(insert)="+DepartmentData.DepartmentID+"\nDepartmentID(to delete)="+DepartmentData.DepartmentIDToDelete);    

                }
                //eof
                
                
		//function to return patient search string, based on patient inout fields
		function CreatePatientSearchString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectPatient";
		
			if(PatientData.PatientID_FieldValue !=="NONE"){
				URL+="&PatientID_Token="+PatientData.PatientID_FieldValue;
			}

			if(PatientData.Forename_FieldValue !=="NONE"){
				URL+="&Forename_Token="+PatientData.Forename_FieldValue;
			}

			if(PatientData.FirstSurname_FieldValue !=="NONE"){
				URL+="&FirstSurname_Token="+PatientData.FirstSurname_FieldValue;
			}

			if(PatientData.SecondSurname_FieldValue !=="NONE"){
				URL+="&SecondSurname_Token="+PatientData.SecondSurname_FieldValue;
			}

			if(PatientData.PatientPhone_FieldValue !=="NONE"){
				URL+="&Phone_Token="+PatientData.PatientPhone_FieldValue;
			}

			if(PatientData.PatientEmail_FieldValue !=="NONE"){
				URL+="&Email_Token="+PatientData.PatientEmail_FieldValue;
			}

			if(PatientData.CompanyID_FieldValue !=="NONE"){
				URL+="&CompanyID_Token="+PatientData.CompanyID_FieldValue;
			}

			if(PatientData.Site_FieldValue !=="NONE"){
				URL+="&Site_Token="+PatientData.Site_FieldValue;
				
			}

			
			if(PatientData.Department_FieldValue !=="NONE"){
				URL+="&Department_Token="+PatientData.Department_FieldValue;
			}

			if(PatientData.BirthDate_FieldValue !=="NONE"){
				URL+="&BirthDate_Token="+PatientData.BirthDate_FieldValue;
			}

			if(PatientData.Gender_FieldValue !=="NONE"){
				URL+="&Gender_Token="+PatientData.Gender_FieldValue;
			}
			
			if(PatientData.PatientAddress_FieldValue !=="NONE"){
				URL+="&Address_Token="+PatientData.PatientAddress_FieldValue;
			}
			
			//alert("(DEBUG)CreatePatientSearchString()-ending.URL="+URL);
			return URL;
			
		}
		//eof
		
		//function to return patient search string, based on patient inout fields
		function CreatePatientSearchSameCompanyString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectPatient";
		
			if(PatientData.PatientID_FieldValue !=="NONE"){
				URL+="&PatientID_Token="+PatientData.PatientID_FieldValue;
			}

			if(PatientData.Forename_FieldValue !=="NONE"){
				URL+="&Forename_Token="+PatientData.Forename_FieldValue;
			}

			if(PatientData.FirstSurname_FieldValue !=="NONE"){
				URL+="&FirstSurname_Token="+PatientData.FirstSurname_FieldValue;
			}

			if(PatientData.SecondSurname_FieldValue !=="NONE"){
				URL+="&SecondSurname_Token="+PatientData.SecondSurname_FieldValue;
			}

			if(PatientData.PatientPhone_FieldValue !=="NONE"){
				URL+="&Phone_Token="+PatientData.PatientPhone_FieldValue;
			}

			if(PatientData.PatientEmail_FieldValue !=="NONE"){
				URL+="&Email_Token="+PatientData.PatientEmail_FieldValue;
			}

                        URL+="&CompanyID_Token="+URLParams.ID;

			if(PatientData.Site_FieldValue !=="NONE"){
				URL+="&Site_Token="+PatientData.Site_FieldValue;
				
			}

			
			if(PatientData.Department_FieldValue !=="NONE"){
				URL+="&Department_Token="+PatientData.Department_FieldValue;
			}

			if(PatientData.BirthDate_FieldValue !=="NONE"){
				URL+="&BirthDate_Token="+PatientData.BirthDate_FieldValue;
			}

			if(PatientData.Gender_FieldValue !=="NONE"){
				URL+="&Gender_Token="+PatientData.Gender_FieldValue;
			}
			
			if(PatientData.PatientAddress_FieldValue !=="NONE"){
				URL+="&Address_Token="+PatientData.PatientAddress_FieldValue;
			}
			
			alert("(DEBUG)CreatePatientSearchSameCompanyString()-ending.URL="+URL);
			return URL;
			
		}
		//eof
                
                
		//function to return string to delete patient, by patient ID (taken from URL)
		function CreatePatientDeleteStringByID(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=DeletePatient";
			URL+="&PatientIDToken="+URLParams.ID;
			//alert("(DEBUG)CreatePatientDeleteStringByID() executed. Return URL="+URL);
			return URL;
			
		}
		//eof

		//function to return string to delete company, by company ID (taken from URL)
		function CreateCompanyDeleteStringByID(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=DeleteCompany";
			URL+="&CompanyIDToken="+URLParams.ID;
			//alert("(DEBUG)CreateCompanyDeleteStringByID() executed. Return URL="+URL);
			return URL;			
	
		}
		//eof
		

		//function to generate URL string to insert patient into dB
		//returns the URL
		function CreatePatientInsertString(){
			
			//alert("(DEBUG)CreatePatientInsertString()-starting");			
			var URL = "../engine/dBInterface.php?";
			URL += "ActionDBToken=InsertPatient";
			URL += "&PatientID_Token="+PatientData.PatientID_FieldValue;
			URL += "&Forename_Token="+PatientData.Forename_FieldValue;
                        URL += "&MiddleName_Token="+PatientData.MiddleName_FieldValue;
			URL += "&FirstSurname_Token="+PatientData.FirstSurname_FieldValue;
			URL += "&SecondSurname_Token="+PatientData.SecondSurname_FieldValue;
			URL += "&Email_Token="+PatientData.PatientEmail_FieldValue;
			URL += "&Phone_Token="+PatientData.PatientPhone_FieldValue;
			URL += "&Gender_Token="+PatientData.Gender_FieldValue;
			URL += "&BirthDate_Token="+PatientData.BirthDate_FieldValue;
			URL += "&Address_Token="+PatientData.PatientAddress_FieldValue;
			URL += "&CompanyID_Token="+PatientData.CompanyID_FieldValue;
			URL += "&Site_Token="+PatientData.Site_FieldValue;

			if(PatientData.Income_FieldValue !=="NONE"){
				URL += "&Income_Token="+PatientData.Income_FieldValue;
			}
                        
                        
					
			alert("(DEBUG)CreatePatientInsertString()-ending.URL="+URL);
			return URL;
			
		}
		//eof
		
		//function to return URL string to insert company into dB
		//returns the URL
		function CreateCompanyInsertString(){
			
			//alert("(DEBUG)CreateCompanyInsertString()-starting");			
			var URL = "../engine/dBInterface.php?";
			URL += "ActionDBToken=InsertCompany";
			URL += "&CompanyID_Token="+CompanyData.CompanyID2_FieldValue;
			URL += "&Email_Token="+CompanyData.CompanyEmail_FieldValue;
			URL += "&Phone_Token="+CompanyData.CompanyPhone_FieldValue;
			URL += "&Address_Token="+CompanyData.Address_FieldValue;
						
			//alert("(DEBUG)CreateCompanyInsertString()-ending.URL="+URL);
			return URL;
			
		}
		//eof
		
		//function to return the URL string to update patient profile data
		//it uses URLParams.ID global to select patient
		function CreatePatientEditString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=UpdatePatient";
			URL+="&PatientID_Token="+URLParams.ID;

			if(PatientData.Forename_FieldValue !=="NONE"){
				URL+="&Forename_Token="+PatientData.Forename_FieldValue;
			}
                        
			if(PatientData.MiddleName_FieldValue !=="NONE"){
				URL+="&MiddleName_Token="+PatientData.MiddleName_FieldValue;
			}
                        
			if(PatientData.FirstSurname_FieldValue !=="NONE"){
				URL+="&FirstSurname_Token="+PatientData.FirstSurname_FieldValue;
			}

			if(PatientData.SecondSurname_FieldValue !=="NONE"){
				URL+="&SecondSurname_Token="+PatientData.SecondSurname_FieldValue;
			}

			if(PatientData.PatientPhone_FieldValue !=="NONE"){
				URL+="&Phone_Token="+PatientData.PatientPhone_FieldValue;
			}

			if(PatientData.PatientEmail_FieldValue !=="NONE"){
				URL+="&Email_Token="+PatientData.PatientEmail_FieldValue;
			}

			if(PatientData.CompanyID_FieldValue !=="NONE"){
				URL+="&CompanyID_Token="+PatientData.CompanyID_FieldValue;
			}

			
			if(PatientData.Site_FieldValue !=="NONE"){
				URL+="&Site_Token="+PatientData.Site_FieldValue;
			}			

			if(PatientData.Department_FieldValue !=="NONE"){
				URL+="&Department_Token="+PatientData.Department_FieldValue;
			}

			if(PatientData.BirthDate_FieldValue !=="NONE"){
				URL+="&BirthDate_Token="+PatientData.BirthDate_FieldValue;
			}
                        
			if(PatientData.JoinDate_FieldValue !=="NONE"){
				URL+="&BirthDate_Token="+PatientData.JoinDate_FieldValue;
			}
                        
			if(PatientData.Gender_FieldValue !=="NONE"){
				URL+="&Gender_Token="+PatientData.Gender_FieldValue;
			}
			
			if(PatientData.PatientAddress_FieldValue !=="NONE"){
				URL+="&Address_Token="+PatientData.PatientAddress_FieldValue;
			}

                        if(PatientData.Income_FieldValue !=="NONE"){
				URL+="&Income_Token="+PatientData.Income_FieldValue;
			}
			//alert("(DEBUG)CreatePatientEditString()-ending.URL="+URL);
			return URL;
			
		}
		//eof

                //function to generate string that updates user <personal data>, ecluding company, role and so on
                //mode=personal, company_role-status
		function CreatePatientEditString2(mode){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=UpdatePatient";
			URL+="&PatientID_Token="+URLParams.ID;

			if(PatientData.Forename_FieldValue !=="NONE"){
				URL+="&Forename_Token="+PatientData.Forename_FieldValue;
			}
                        
			if(PatientData.MiddleName_FieldValue !=="NONE"){
				URL+="&MiddleName_Token="+PatientData.MiddleName_FieldValue;
			}
                        
			if(PatientData.FirstSurname_FieldValue !=="NONE"){
				URL+="&FirstSurname_Token="+PatientData.FirstSurname_FieldValue;
			}

			if(PatientData.SecondSurname_FieldValue !=="NONE"){
				URL+="&SecondSurname_Token="+PatientData.SecondSurname_FieldValue;
			}

			if(PatientData.PatientPhone_FieldValue !=="NONE"){
				URL+="&Phone_Token="+PatientData.PatientPhone_FieldValue;
			}

			if(PatientData.PatientEmail_FieldValue !=="NONE"){
				URL+="&Email_Token="+PatientData.PatientEmail_FieldValue;
			}

			if(PatientData.CompanyID_FieldValue !=="NONE"){
				URL+="&CompanyID_Token="+PatientData.CompanyID_FieldValue;
			}

			
			if(PatientData.Site_FieldValue !=="NONE"){
				URL+="&Site_Token="+PatientData.Site_FieldValue;
			}			

			if(PatientData.Department_FieldValue !=="NONE"){
				URL+="&Department_Token="+PatientData.Department_FieldValue;
			}

			if(PatientData.BirthDate_FieldValue !=="NONE"){
				URL+="&BirthDate_Token="+PatientData.BirthDate_FieldValue;
			}
                        
			if(PatientData.JoinDate_FieldValue !=="NONE"){
				URL+="&BirthDate_Token="+PatientData.JoinDate_FieldValue;
			}
                        
			if(PatientData.Gender_FieldValue !=="NONE"){
				URL+="&Gender_Token="+PatientData.Gender_FieldValue;
			}
			
			if(PatientData.PatientAddress_FieldValue !=="NONE"){
				URL+="&Address_Token="+PatientData.PatientAddress_FieldValue;
			}

                        if(PatientData.Income_FieldValue !=="NONE"){
				URL+="&Income_Token="+PatientData.Income_FieldValue;
			}
			//alert("(DEBUG)CreatePatientEditString()-ending.URL="+URL);
			return URL;
			
		}
		//eof                
                



		//returns the URL string to search company profile 
		function CreateCompanySearchString(){
			
			//alert("(DEBUG)CreateCompanySearchString()- starting");
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectCompany";

			if(CompanyData.CompanyID2_FieldValue!=="NONE"){
				URL += "&CompanyID_Token="+CompanyData.CompanyID2_FieldValue;
			}

			if(CompanyData.CompanyEmail_FieldValue!=="NONE"){
				URL += "&Email_Token="+CompanyData.CompanyEmail_FieldValue;
			}			
			
			if(CompanyData.CompanyPhone_FieldValue!=="NONE"){
				URL += "&Phone_Token="+CompanyData.CompanyPhone_FieldValue;
			}	
	
			if(CompanyData.Address_FieldValue!=="NONE"){
				URL += "&Address_Token="+CompanyData.Address_FieldValue;
			}
			
			//alert("(DEBUG)CreateCompanySearchString()-ending.URL="+URL);
			return URL;
		
		}
		//eof
		
		//returns the URL string to update company profile 
		function CreateCompanyEditString(){
			
			//alert("(DEBUG)CreateCompanyEditString()- starting");
			var URL = "../engine/dBInterface.php?ActionDBToken=UpdateCompany";
			URL += "&CompanyID_Token="+URLParams.ID;

			if(CompanyData.CompanyEmail_FieldValue!=="NONE"){
				URL += "&Email_Token="+CompanyData.CompanyEmail_FieldValue;
			}			
			
			if(CompanyData.CompanyPhone_FieldValue!=="NONE"){
				URL += "&Phone_Token="+CompanyData.CompanyPhone_FieldValue;
			}	

			if(CompanyData.Address_FieldValue!=="NONE"){
				URL += "&Address_Token="+CompanyData.Address_FieldValue;
			}                    
                        
                        //
			//FIXME:for demo this is commented out	
			/*
			if(CompanyData.Address_FieldValue!=="NONE"){
				URL += "&AddressToken="+CompanyData.Address_FieldValue;
			}
			*/
			
			//alert("(DEBUG)CreateCompanyEditString()-ending.URL="+URL);
			return URL;
		
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

		
		//function to validate patient input data in HTML fields
		//returns true if everything is valid, otherwise false
		function CheckPatientInputData(){	
			
			//alert("(DEBUG)CheckPatientInputData() - starting"  );
			
			if(CheckInputField(PatientData.Forename_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en Nombre");
				return false;
			}else if(CheckInputField(PatientData.FirstSurname_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en Primer Apellido");
				return false;
			}else if(CheckInputField(PatientData.SecondSurname_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en Segundo Apellido");
				return false;
			}else if(CheckInputField(PatientData.PatientEmail_FieldValue,"email")==false){
				//alert("ERROR - Entrada invalida en Email");
				return false;
			}else if(1==10){
			//	//alert("ERROR - Entrada invalida en telefono");
			//FIXME: script failing when checking the phone number	
				return false;
			}else{
				//alert("(DEBUG)CheckPatientInputData() - ending. Return TRUE"  );
				return true;				
			}
			
		}
		//eof


		
		//function to validate company input data in HTML fields
		//returns true if everything is valid, otherwise false
		function CheckCompanyInputData(){	
			
			//alert("(DEBUG)CheckPatientInputData() - starting"  );
			
			if(CheckInputField(CompanyData.CompanyID2_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en ID Empresa");
				return false;
			}else if(CheckInputField(CompanyData.CompanyEmail_FieldValue,"email")==false){
				//alert("ERROR - Entrada invalida en Nombre de Empresa");
				return false;
			}else if(1==10){
				//alert("ERROR - Entrada invalida en Telefono");
				//FIXME: the company phone check is causing the script to crash. No idea why. Patient phone do works.
				return false;
			}else{
				//alert("(DEBUG)CheckCompanyInputData() - ending. Return TRUE"  );
				return true;				
			}
			
		}
		//eof

		//function to validate company input data in HTML fields
		//returns true if everything is valid, otherwise false
		function CheckCompanyInputData_mock(){	
			
			//alert("(DEBUG)CheckPatientInputData() - starting"  );
			
			if(CheckInputField(CompanyData.CompanyPhone_FieldValue,"phone")==false){
				//alert("ERROR - Entrada invalida en Telefono");
				return false;
			}else{
				//alert("(DEBUG)CheckCompanyInputData() - ending. Return TRUE"  );
				return true;				
			}
			
		}
		//eof

		

		//2. Create <Company> Search string, by ID arg (taken from URL "ID" arg)
		// returns URL string
		function CreateCompanySearchStringByID () {
			
			var URLstring = "../engine/dBInterface.php?ActionDBToken=SelectCompany";
			URLstring+="&CompanyID_Token="+URLParams.ID;
			//alert("(DEBUG)CreateCompanySearchStringbyID() - Company Search String="+URLstring);
			return URLstring;
			
		};
		//end of function		
	
		//2. Create <patient> Search string, by ID arg (taken from URL "ID" arg)
		// returns URL string
		function CreatePatientSearchStringByID () {
			
			var URLstring = "../engine/dBInterface.php?ActionDBToken=SelectPatient";
			URLstring+="&PatientID_Token="+URLParams.ID;
			//alert("(DEBUG)CreatePatientSearchString() - Patient Search String="+URLstring);
			return URLstring;
			
		};
		//end of function

                
                //function de create string to create a new department 
                function CreateDepartmentListString(){
                    
                    var URL = "../engine/dBInterface.php?ActionDBToken=ListDepartment";
                    //alert("(DEBUG)CreateDepatmentInsertString() executed. Returning URL="+URL);
                    return URL;
                    
                }
                //eof                

                //function de create string to create a new department 
                function CreateDepartmentInsertString(){
                    
                    var URL = "../engine/dBInterface.php?ActionDBToken=InsertDepartment";
                    URL += "&DepartmentID_Token="+DepartmentData['DepartmentID'];
                    //alert("(DEBUG)CreateDepatmentInsertString() executed. Returning URL="+URL);
                    return URL;
                    
                }
                //eof
                
                function CreateDepartmentDeleteString(){
                    
                    var URL = "../engine/dBInterface.php?ActionDBToken=DeleteDepartment";
                    URL += "&DepartmentID_Token="+DepartmentData.DepartmentIDtoDelete;
                    alert("(DEBUG)CreateDepartmentDeleteString() executed. Returning URL="+URL);
                    return URL;
                    
                }
                //eof                
		
		//function to search patient by ID, Surname, Forename, Company, etc
		//intended to be called from HTML
		$scope.SearchPatient = function(){
			
			//alert ("(DEBUG)-SearchPatient() - starting");
			ResetPatientFieldValues();
			ReadPatientFields();		
			CallPHPServerFile(CreatePatientSearchString());
			//alert ("(DEBUG)-SearchPatient() - executed");			
		}
		//eof
		
		//function to search patient by ID, Surname, Forename, Company, etc
		//intended to be called from HTML
		$scope.SearchPatientWithinSameCompany = function(){
			
			//alert ("(DEBUG)-SearchPatient() - starting");
			ResetPatientFieldValues();
			ReadPatientFields();		
			CallPHPServerFile(CreatePatientSearchSameCompanyString());
			//alert ("(DEBUG)-SearchPatient() - executed");			
		}
		//eof
                //		
		//general function to introduce a new patient in dB	
		$scope.CreatePatient = function() {			
			
			//alert ("(DEBUG)-CreatePatient() - starting");
			ReadPatientFields();		
			
			if (CheckPatientInputData()==true){
				//alert("(DEBUG)CreatePatient()-Input data is right");
				CallPHPServerFile(CreatePatientInsertString());
			}else{
				//alert("ERROR - datos invalidos");				
			}
			//alert ("(DEBUG)-CreatePatient() - executed");
		}
		//eof	

		//function to search company by ID, Surname, Forename, Company, etc
		//intended to be called from HTML button from 
		$scope.SearchCompany = function(){
			
			//alert ("(DEBUG)-SearchCompany() - starting");
			ResetCompanyFieldValues();
			ReadCompanyFields();		
			CallPHPServerFile(CreateCompanySearchString());
			//alert ("(DEBUG)-SearchCompany() - executed");			
		}
		//eof		
		
		//general function to introduce a new company in dB	
		$scope.CreateCompany = function() {			
			
			//alert ("(DEBUG)-CreateCompany() - starting");
			
			ReadCompanyFields();
			
			if (CheckCompanyInputData()==true){
				//alert("(DEBUG)CreatePatient()-Input data is right");
				CallPHPServerFile(CreateCompanyInsertString());
			}else{
				//alert("ERROR - datos invalidos en campos de empresa");				
			}
			//alert ("(DEBUG)-CreateCompany() - executed");
		}
		//eof		

		//function to store updated company into dB
		$scope.EditPatient = function(){
			
			//alert("(DEBUG) EditPatient() - starting");
			ReadPatientFields();			
			CallPHPServerFile(CreatePatientEditString());			
		}
		//eof
		
		//function to store updated company into dB
		$scope.EditCompany = function(){
			
			//alert("(DEBUG) EditCompany() - starting");
			ReadCompanyFields();			
			CallPHPServerFile(CreateCompanyEditString());
			//window.location.replace("edit_profiles.html?Action=EditCompany&ID="+URLParams.ID+"&Message=Updated");			
		}
		//eof

                //function to insert department
                $scope.CreateDepartment = function(){
                    
                    ReadDepartmentFields();
                    CalldBEngine(CreateDepartmentInsertString(),"CreateDepartment_data");
                    
                }
                //eof
		
                //function to delete selected department
                
                $scope.DeleteDepartment = function(){
                    
                    ReadDepartmentFields();
                    CalldBEngine(CreateDepartmentDeleteString(),"DeleteDepartment_data");
                    
                }                
                
                
		//function to delete patient. Intended to be called from HTML page
		//no return
		$scope.DeletePatient = function(){
			
			//alert("(DEBUG)DeletePatient() - starting");
			CallPHPServerFile(CreatePatientDeleteStringByID());
			//alert("(DEBUG)DeletePatient() - executed");
		}
		//eof
		
		
		//function to delete company. Intended to be called from HTML
		//no return
		$scope.DeleteCompany = function(){
			//alert("(DEBUG)DeleteCompany() - starting");
			CallPHPServerFile(CreateCompanyDeleteStringByID());
			//alert("(DEBUG)DeleteCompany() - executed");
		}
		//eof
		
                $scope.Logout = function(){
                    
                    var URL = "../engine/dBInterface.php?ActionDBToken=Logout";
                    //alert("(DEBUG)Logout()-Logging off");
                    CalldBEngine(URL,"data");
                    Redirect("../index/login.html");
                    
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
		

		
		//7. Function to call php server file, in $address
		//FIXME: add the .error part
		function CallPHPServerFile(URLstring) {			
			
			
			//alert("(DEBUG)Function CallPHPServerFile() calling"); //(DEBUG)			
			$http.get(URLstring)
			.success(function(data){
			$scope.data = data;
			})
			
			//alert("(DEBUG)Function CallPHPServerFile() executed"); //(DEBUG)

		}
		//eof
                //
		//7.3 Function to call php server file, in $address
		//FIXME: add the .error part
		function CalldBEngine(URLstring,OutputType) {			
			
			
                        //alert("(DEBUG)Function CallPHPServerFile() calling"); //(DEBUG)			
			$http.get(URLstring)
			.success(function(data){
				
			if(OutputType=="CompanyList"){	
				$scope.CompanyList = data; //companyID list from mySQL
			}else if(OutputType=="data"){
				$scope.data=data;
			}else if(OutputType=="DepartmentList"){
				$scope.DepartmentList=data;
			}else if(OutputType=="DeleteDepartment_data"){
				$scope.DeleteDepartment_data=data;
			}
                        
                        
                        
			
			})
                }        
                        
		//8. Function to check if Patient has been succesfully created into database
		//returns TRUE if patient do exists
		function CheckIfPatientExists(){
			
			
			return true;
		}
		//eof
		
		//8. Init Function to call Main with parameter Type
		$scope.Init = function(Type) {
			Main(Type);			
		}
		
		//debug function
		$scope.dg = function(){
			//alert("(DEBUG) Oh yeaaaahhh!(Patient)");
			
			ReadPatientFields();
			CreatePatientInsertString();
			//CreatePatientDeleteStringByID();
			
			
			//CheckURLParameters();
			//CallPHPServerFile(CreatePatientSearchStringByURL());
			
			//ReadPatientFields();
			//CheckInputField(PatientData.Forename_FieldValue,"text");
			//CheckPatientInputData();
			/*
			ResetVars();
			ReadPatientFields();
			CreatePatientInsertString();
			CheckPatientInputFields();
			*/
		}
		
		//debug function for company
		$scope.dg_company = function(){
			//alert("(DEBUG) Starting Debug function(Company)");
			ReadCompanyFields();
			CreateCompanyEditString();
			
			//CheckURLParameters();
			//CallPHPServerFile(CreateCompanySearchStringByURL());
						
			/*
			ReadCompanyFields();
			CheckCompanyInputData();
			CreateCompanyInsertString();
			*/
			
			//alert("(DEBUG)  Ending Debug function(Company)");

		}
		
		//function to save patient changes 
		//FIXME: is this required?
		$scope.UpdatePatient = function(){
			
			$scope.ReadPatientFields();
			
			if(IsThereChanges()==true){
				$scope.Modal_Message = "Changes were detected";
			}else{
				$scope.Modal_Message = "Changes weren`t detected";
			}
			//alert("(DEBUG)UpdatePatient() is finished")
			
		}
		//eof
		
		//9. MAIN function to execute scripts
		// Arg Type="Patient" or "Company". Its set by HTML controller tag
		// return true if succesfully executed
		function Main (Type) {	
			
			//alert("(DEBUG)Main()-starting with Type="+Type);
			CalldBEngine("../engine/dBInterface.php?ActionDBToken=ListCompany","CompanyList");
                        CalldBEngine(CreateDepartmentListString(),"DepartmentList");
                        
			//check parameters
			if(CheckURLParameters()==true){
				
				if(Type=='Patient' && URLParams.Action=="EditPatient"){
					
					CallPHPServerFile(CreatePatientSearchStringByID());
					return true;
				}
				else if (Type=='Company' && URLParams.Action=="EditCompany"){
					
					CallPHPServerFile(CreateCompanySearchStringByID());
					return true;
				}
                                else if (Type=='Company' && URLParams.Action=="WatchCompany"){
					
					CallPHPServerFile(CreateCompanySearchStringByID());
					return true;
				}
				else if(Type=='Patient' && URLParams.Action=="WatchPatient"){
					
					CallPHPServerFile(CreatePatientSearchStringByID());
					return true;
				}                                
				else{
					//ActionParam is undefined
					//alert("(DEBUG)Main - Finishing Main without search");
					return false;
				}
				
				
				
			}else{
				//failed the URL args validation
				return false;
			}
					
			
		} 	
		
	
	//---------------END OF FUNCT DEF-------------------------
	
	//---------------Executing Script
	//Main('Patient');
	
	
	}]);
