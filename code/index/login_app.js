var fetch = angular.module('fetch', []);

	fetch.controller('dbCtrl', ['$scope', '$http', function ($scope, $http) {
		
		//------------1. USER CONST -----------------------
		var GeneralGlobals ={};
		GeneralGlobals['DebugFlag']="NONE"; //NONE, TRUE,
		
		
		//------------2. PROGRAM VARS (DON'T TOUCH) -------
		
		//alert("(DEBUG)Welcome to login  screen v2.9");
		
		var UserData = {};
		UserData['UserID_FieldValue']="NONE";
		UserData['Password_FieldValue']="NONE";

		//to read URL params var
		var URLParams = {};
		URLParams['Action'] = "NONE";
		URLParams['ID'] = "NONE";
                
                //
                var GlobalLoginData={};
                GlobalLoginData['LoginSuccessful']=0;

		//-------------3. FUNCTIONS-----------------------------
		
		//3.1 function to reset login values
		function ResetUserFieldValues(){
			
			UserData.UserID_FieldValue="NONE";
			UserData.Password_FieldValue="NONE";
			//alert("(DEBUG)ResetUserFieldValues() executed. Values. \nUserID="+UserData.UserID_FieldValue+"\nPass="+UserData.Password_FieldValue);	
			
		}
		
		//3.2 function to check parameters
		//returns 1 if params are valid, if invalid:0	(invalid=>params are NULL, NONE or undefined)	
		function CheckURLParameters(){	

			
			//vars to read URL parameters
			URLParams.Action=getUrlVars()["Action"];
			URLParams.ID=getUrlVars()["ID"];			

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

			//returns TRUE just if both params are different to Null, NONE, undefined or empty
			result = Boolean(var1_valid*var2_valid);
			//("(DEBUG)CheckURLParameters(). ID_Param="+URLParams.ID+",Action_Param="+URLParams.Action+"-Returning "+result);
			return result;
						
			
			
		}		
		//eof

		//2.3 function to read username/password fields
		function ReadUserFields(){
			
			//alert("(DEBUG)ReadUserFields() starting");
			
			if (typeof $scope.UserID_Input_Model !== 'undefined' && $scope.UserID_Input_Model !== null && $scope.UserID_Input_Model !== "") {
				UserData['UserID_FieldValue'] = $scope.UserID_Input_Model;
			}else{
				UserData['UserID_FieldValue'] = "NONE";
			}			
			
			//alert("(DEBUG)ReadUserFields() - reading password");
			
			if (typeof $scope.Password_Input_Model !== 'undefined' && $scope.Password_Input_Model !== null && $scope.Password_Input_Model !== "") {
				UserData['Password_FieldValue'] = $scope.Password_Input_Model;
			}else{
				UserData['Password_FieldValue'] = "NONE";
			}				
			
			//alert("(DEBUG)ReadUserFields() executed. Values="+UserData.UserID_FieldValue+","+UserData.Password_FieldValue);
					
		}
		//eof
		
		//2.4 function to generate login URL string (user/pass)
		//no return
		function CreateLoginString(){
			
			//alert("(DEBUG)CreateLoginString()-starting");			
			var URL = "../engine/dBInterface.php?";
			URL += "ActionDBToken=CheckLoginCredentials"; 
			URL += "&UserID_Token="+UserData.UserID_FieldValue;
			URL += "&Password_Token="+UserData.Password_FieldValue;
			//alert("(DEBUG)CreateLoginString() executed. Return URL="+URL);
			return URL;
			
		}
		//eof		
                
                function CreateLogoutString(){
                    
                    var URL = "../engine/dBInterface.php?";
                    URL += "ActionDBToken=Logout";
                    return URL;
                }
                //eof
		
		
		
		//2.5 validating input field to prevent the user to enter invalid words or chars
		//returns true is field value is valid
		//forbidden substring: ADD, ALTER, AND, CREATE, DELETE, DROP,  EXISTS, IF, INSERT, LIKE, OR, SELECT, UNION, UPDATE, WHERE
 		//forbidden characters: <>@¡!#$%^&*()_+[]{}¿?:;|'\"\\,./~`¨-=ñáéúóíàèìòùäëïöüâêîôû
		function CheckInputField(field_value,field_type){			
		
			alert("(DEBUG)CheckInputField() - executing on value="+field_value+", type="+field_type);
			
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
			alert("(DEBUG)CheckInputField() - looking for forbidden words="+temp);
			

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
								alert("(DEBUG)CheckInputField()-detecting invalid char="+specialChars[i]+".Returning FALSE");
								return false;
							}
					}
					//("(DEBUG)CheckInputField()-executed. Returning TRUE");	
					return true;
				}

		} 
		//eof		

		//2.6 function to validate patient input data in HTML fields
		//returns true if everything is valid, otherwise false
		function CheckUserInputData(){	
			
			//("(DEBUG)CheckPatientInputData() - starting"  );
			
			if(CheckInputField(UserData.UserID_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en Usuario");
				return false;
			}else if(CheckInputField(UserData.Password_FieldValue,"text")==false){
				//alert("ERROR - Entrada invalida en Clave");
				return false;
			}else{
				//alert("(DEBUG)CheckPatientInputData() - ending. Return TRUE"  );
				return true;				
			}			
			
		}
		//eof

		//2.7 function to send Login user/pass over server. Server returns TRUE if login was succesfull
		//intended to be called from HTML button
		$scope.Login = function(){
			
			
			//alert ("(DEBUG)-Login() - starting");
			ResetUserFieldValues();
			ReadUserFields();
			CalldBEngine(CreateLoginString(),"LoginData");
			//alert ("(DEBUG)-Login() - executed");
                        
                        //alert("scope.Login()-LoginData="+$scope.LoginData);
                        //alert("scope.Login()-GlobalLoginData="+GlobalLoginData);
                        
                        //setTimeout(function(){}, 500); 
                            //alert("value is"+$scope.LoginData);
                            
                        if($scope.LoginData>=1){
                            //alert("value is 1");
                            //window.location.replace("../profiles/sp.php");
                            window.location.replace("../index/index.php");
						}else if(OutputType=="data"){
							$scope.data=data;
                        }else if($scope.LoginData==0){
                            alert("ERROR - Datos de acceso incorrectos");
                            
                        }else{
                            //datos no recibidos y otras situaciones
                        }
                        
                        
		}
		//eof		
		
		
		//2.8 dummy login routine for demo.if user/pass are fine, redirect to URL
		
		$scope.DummyLogin = function(){
			
			
			alert("Welcome!");
			/*
			ResetUserFieldValues();
			ReadUserFields();
			
			if (UserData.UserID_FieldValue == "admin" && UserData.Password_FieldValue == "admin"){
				
				alert("Welcome!");
				
							
			}else{
				
				alert("ERROR - Datos de acceso incorrecto");
			}
			*/
			window.location.replace("../index/index.php");
			
		}
		//eof
		
		//2.9. Function to read vars from URL string
		//intended to get "Action" and "ID" for patients and companies
		//Its called this way:		var first = getUrlVars()["Action"]; var second = getUrlVars()["ID"];*/
		function getUrlVars() {
			
			
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
			});
			return vars;
			
		}
		

		//2.10 Function to call php server file, in $address
		//FIXME: add the .error part
                //FIXME: add ont time out to $http.get
		function CallPHPServerFile(URLstring) {			
			
			
			//alert("(DEBUG)Function CallPHPServerFile() calling"); //(DEBUG)			
			$http.get(URLstring)
			.success(function(data){
			$scope.data = data;
			})
			
			//alert("(DEBUG)Function CallPHPServerFile() executed"); //(DEBUG)

		}
		//eof
		
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
                            }else if(OutputType=="PatientData"){
                                    $scope.PatientData=data;
                            }else if(OutputType=="PVData"){
                                    $scope.PVData=data;
                            }else if(OutputType=="ReportData"){
                                    $scope.ReportData=data;
                                    //("using ReportData");
                            }else if(OutputType=="ReportDataOrg"){
                                    $scope.ReportDataOrg=data;
                                   //alert("using ReportData");
                            }else if(OutputType=="LoginData"){
                                    $scope.LoginData=data;
                            }
                       
                        
			})
                        
			//alert("(DEBUG)Function CalldBEngine() executed on URL="+URLstring); //(DEBUG)

		}
		//eof	
		
		//logout function
		$scope.Logout = function(){
    
			var URL = "../engine/dBInterface.php?ActionDBToken=Logout";
			//alert("(DEBUG)Logout()-Logging off");
			CalldBEngine(URL,"data");
			Redirect("../index/login.html");
			
		}
		//eof
		
		
		
		//debug function
		$scope.dg = function(){
			alert("(DEBUG) Oh yeaaaahhh!(User). Data="+$scope.LoginData);
		}
		
		
	}]);
