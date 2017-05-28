var fetch = angular.module('fetch', []);

	fetch.controller('dbCtrl', ['$scope', '$http', function ($scope, $http) {
		
		
		//alert("Executing Eval_APP controller v1.41");
		
		//------------1. USER CONST -----------------------
		var GeneralGlobals ={};
		GeneralGlobals['DebugFlag']="NONE"; //NONE, TRUE,
		
		
		//------------2. PROGRAM VARS (DON'T TOUCH) -------
		
		//2.1 to store evaluation data from APP (Antecedentes PAtologicos)
		//tested ok
		var APPData={};
		APPData['Hypertension']="NONE";
		APPData['Diabetes']="NONE";
		APPData['Cardiomyopathy']="NONE";
		APPData['Obesity']="NONE";
                APPData['Dyslipidemia']="NONE";
                APPData['Sedentarism']="NONE";
                APPData['Depression']="NONE";
                APPData['Alcohol']="NONE";
                APPData['Tobacco']="NONE";
                APPData['Cmmnt']="NONE";
		
		//2.2 to store APNP Data (Antecedentes Mo Patologicos)
		var APNPData={};
		APNPData['Cmmnt']="NONE";
		
		//2.3 to store AQX (Antecedentes Quirurgicos)
		var AQXData={};
		AQXData['Cmmnt']="NONE";
		
		//2.4 to store Medicines (Medicamentos)
		var MEDData={};
		MEDData['Cmmnt']="NONE";
		
		//2.5 to store Injuries (Lesiones)
		var INJData={};
		INJData['Cmmnt']="NONE";
		
		//2.6 to store Physiological Variables (Variables Fisiologicas)
		var PVData={};
		PVData['HeartFreq']=0;
                PVData['BldPrssr']=0;
                PVData['Glycemia']=0;
                PVData['SO2']=0;
                PVData['WaistCirc']=0;
                PVData['VO2Max']=0;
                PVData['Cmmnt']="NONE";
                PVData['OtherVarName']="";
                PVData['OtherVarValue']=0;
                
		//2.7 to store Corporal Composition variables (variables de composicion corporal)
		var BodyCompData={};
		BodyCompData['Weight']=0;
                BodyCompData['TargetWeight']=0;
		BodyCompData['FatMass']=0;
		BodyCompData['MuscleMass']=0;
		BodyCompData['BMI']=0;
		BodyCompData['FatPer']=0;
		BodyCompData['InBodyScore']=0;
		BodyCompData['BasMet']=0;
		BodyCompData['ViscFat']=0;
		BodyCompData['Flex']=0;
		BodyCompData['MR']=0;
                BodyCompData['Repetitions']=0;
                BodyCompData['HydrtnLvl']=0;
                BodyCompData['FatCntrl']=0;
                BodyCompData['MuscleCntrl']=0; 
                BodyCompData['OtherVarName']="";
                BodyCompData['OtherVarValue']=0;
                BodyCompData['Cmmnt']="NONE";

                //2.8 to Store Questionnaires text area
                var QuestData={};
                QuestData['Cmmnt']="NONE";
                
                //2.9 Indidividualization data
                var IndData={};
                IndData['Cmmnt']="NONE";
                
                //3.0 Nutrition Data
                var NtrtnData={};
                NtrtnData['Cmmnt']="NONE";
                
                //3.1 Physiotherapy Data
                var PhysThrpyData={};
                PhysThrpyData['Cmmnt']="NONE";
                
		//2. to store URL vars
		var URLParams={};
		URLParams['Action']="NONE";//expected: "InsertEval"(to create new eval), "EditVal"(to edit existent eval), "DeleteVal" 
		URLParams['ID']="NONE";//expected: PatientID
		URLParams['RowID']="NONE";//used to edit one eval file, selected previously by RowID
		URLParams['Message']="NONE";

               
		//--------------END OF VARS ----------------------------
	
	
		//-------------3. FUNCTIONS-----------------------------
		
		
		//3.1 Resetting APP Field Values. no return
                
		function ResetAPPFieldValues(){
                    
                    APPData['Hypertension']="NONE";
                    APPData['Diabetes']="NONE";
                    APPData['Cardiomyopathy']="NONE";
                    APPData['Obesity']="NONE";
                    APPData['Dyslipidemia']="NONE";
                    APPData['Sedentarism']="NONE";
                    APPData['Depression']="NONE";
                    APPData['Alcohol']="NONE";
                    APPData['Tobacco']="NONE";
                    APPData['Cmmnt']="NONE";
                       
		}
		//end of function
		
                
		//3.2 Reseting ANPN Field values. No return		
		function ResetAPNPFieldValues(){
                    APNPData['Cmmnt']="NONE";	

		}
		//eof
		
		//3.3 Resetting AQX Field Values
		function ResetAQXFieldValues(){
                    AQXData['Cmmnt']="NONE";	

		}
		//eof
		
                
		//3.4 Resetting Medicines Field Values. No return
		function ResetMEDFieldValues(){
                    MEDData['Cmmnt']="NONE";
			
		}
		//eof
		
		//3.5 Resetting Injuries Field Values. No return
		function ResetINJFieldValues(){
                    INJData['Cmmnt']="NONE";	
			
		}
		//eof
		
                
		//3.6 Resetting Body Composition Field Values. No return
		function ResetBCFieldValues(){
                    
                    BodyCompData['Weight']=0;
                    BodyCompData['TargetWeight']=0;
                    BodyCompData['FatMass']=0;
                    BodyCompData['MuscleMass']=0;
                    BodyCompData['BMI']=0;
                    BodyCompData['FatPer']=0;
                    BodyCompData['InBodyScore']=0;
                    BodyCompData['BasMet']=0;
                    BodyCompData['ViscFat']=0;
                    BodyCompData['Flex']=0;
                    BodyCompData['MR']=0;
                    BodyCompData['Repetitions']=0;
                    BodyCompData['HydrtnLvl']=0;
                    BodyCompData['FatCntrl']=0;
                    BodyCompData['MuscleCntrl']=0;
                    BodyCompData['Cmmnt']="NONE";			
                    BodyCompData['OtherVarName']="";
                    BodyCompData['OtherVarValue']=0;                      
		}
		
		
		//3.7 Resetting physiological Field Values. No return
		function ResetPVFieldValues(){
			
                    PVData['HeartFreq']=0;
                    PVData['BldPrssr']=0;
                    PVData['Glycemia']=0;
                    PVData['SO2']=0;
                    PVData['WaistCirc']=0;
                    PVData['VO2Max']=0;
                    PVData['Cmmnt']="NONE";
                    PVData['OtherVarName']="";
                    PVData['OtherVarValue']=0;			
		}
		//eof
                
		
                //3.8 Resetting Questionnaire data
                function ResetQuestFieldValues(){
                    QuestData['Cmmnt']="NONE";
                }
                
                
                //3.9 Resetting Individualization data
                function ResetIndFieldValue(){
                    IndData['Cmmnt']="NONE";
                }
                
                //3.10 Resetting Nutrition data
                function ResetNtrtnFieldValue(){
                    NtrtnData['Cmmnt']="NONE";
                }
                
                //3.11 PhysioTherapy data
                
                function ResetPTFieldValue(){
                    PhysThrpyData['Cmmnt']="NONE";                
                }
                
               
		//function to check parameters and store URL Params in vars
		//returns 1 if params are valid, if invalid:0	(invalid=>params are NULL, NONE or undefined)
		//tested ok		
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
				alert("Perfil actualizado");
				
			}else{				
				
			}			
			

			//returns TRUE just if both params are different to Null, NONE, undefined or empty
			result = Boolean(var1_valid*var2_valid);
			//alert("(DEBUG)CheckURLParameters(). ID_Param="+URLParams.ID+",Action_Param="+URLParams.Action+"-Returning "+result);
			return result;
						
			
			
		}		
		//eof
		
	
		
		//2. read APP HTML elements	
		//no return
		//tested ok
		function ReadAPPData() {			
			
			//alert("(DEBUG)ReadAPPData() - starting");
						
					
			if (typeof $scope.Hyprtsn_Input_Model !== 'undefined' && $scope.Hyprtsn_Input_Model !== null && $scope.Hyprtsn_Input_Model !== "") {
				APPData['Hypertension'] = $scope.Hyprtsn_Input_Model;
			}else{
				APPData['Hypertension'] = "NONE";
			}			

			if (typeof $scope.Dbts_Input_Model !== 'undefined' && $scope.Dbts_Input_Model !== null && $scope.Dbts_Input_Model !== "") {
				APPData['Diabetes'] = $scope.Dbts_Input_Model;
			}else{
				APPData['Diabetes'] = "NONE";
			}
			
			if (typeof $scope.Crdmpthy_Input_Model !== 'undefined' && $scope.Crdmpthy_Input_Model !== null && $scope.Crdmpthy_Input_Model !== "") {
				APPData['Cardiomyopathy'] = $scope.Crdmpthy_Input_Model;
			}else{
				APPData['Cardiomyopathy'] = "NONE";
			}	
			
			if (typeof $scope.Obsty_Input_Model !== 'undefined' && $scope.Obsty_Input_Model !== null && $scope.Obsty_Input_Model !== "") {
				APPData['Obesity'] = $scope.Obsty_Input_Model;
			}else{
				APPData['Obesity'] = "NONE";
			}	
			
			if (typeof $scope.Dyslpdm_Input_Model !== 'undefined' && $scope.Dyslpdm_Input_Model !== null && $scope.Dyslpdm_Input_Model !== "") {
				APPData['Dyslipidemia'] = $scope.Dyslpdm_Input_Model;
			}else{
				APPData['Dyslipidemia'] = "NONE";
			}
                        
			if (typeof $scope.Dprssn_Input_Model !== 'undefined' && $scope.Dprssn_Input_Model !== null && $scope.Dprssn_Input_Model !== "") {
				APPData['Depression'] = $scope.Dprssn_Input_Model;
			}else{
				APPData['Depression'] = "NONE";
			} 
                        
			if (typeof $scope.Tobacco_Input_Model !== 'undefined' && $scope.Tobacco_Input_Model !== null && $scope.Tobacco_Input_Model !== "") {
				APPData['Tobacco'] = $scope.Tobacco_Input_Model;
			}else{
				APPData['Tobacco'] = "NONE";
			}   
                        
			if (typeof $scope.Alcohol_Input_Model !== 'undefined' && $scope.Alcohol_Input_Model !== null && $scope.Alcohol_Input_Model !== "") {
				APPData['Alcohol'] = $scope.Alcohol_Input_Model;
			}else{
				APPData['Alcohol'] = "NONE";
			}  

			if (typeof $scope.Sdntrsm_Input_Model !== 'undefined' && $scope.Sdntrsm_Input_Model !== null && $scope.Sdntrsm_Input_Model !== "") {
				APPData['Sedentarism'] = $scope.Sdntrsm_Input_Model;
			}else{
				APPData['Sedentarism'] = "NONE";
			}
                        
			if (typeof $scope.APP_Cmmnt_Input_Model !== 'undefined' && $scope.APP_Cmmnt_Input_Model !== null && $scope.APP_Cmmnt_Input_Model !== "") {
				APPData['Cmmnt'] = $scope.APP_Cmmnt_Input_Model;
			}else{
				APPData['Cmmnt'] = "NONE";
			}                         
               
			$debug_string = "\nHypertension="+APPData['Hypertension'];
			$debug_string +="\nDiabetes="+APPData['Diabetes'] ;
			$debug_string +="\nCardiomyopathy="+APPData['Cardiomyopathy'];
			$debug_string +="\nObesity="+APPData['Obesity'];                        
                        $debug_string = "\nHypertension="+APPData['Hypertension'];
                        $debug_string +="\nDiabetes="+ APPData['Diabetes'];
                        $debug_string +="\nCardiomyopathy="+APPData['Cardiomyopathy'];
                        $debug_string +="\nObesity="+APPData['Obesity'];
                        $debug_string +="\Dyslipidemia="+APPData['Dyslipidemia'];
                        $debug_string +="\nSedentarism="+APPData['Sedentarism'];
                        $debug_string +="\nDepression="+APPData['Depression'];
                        $debug_string +="\nAlcohol="+APPData['Alcohol'];
                        $debug_string +="\nAlcohol="+APPData['Tobacco'];
                        $debug_string +="\nComment="+APPData['Cmmnt'];
			
			//alert("(DEBUG)Function ReadAPPData() executed. Results:"+$debug_string); //(DEBUG)
			
		
		}
		//end of function

		//function to read APNP vars. No return
		function ReadAPNPData(){
            
			if (typeof $scope.APNP_Cmmnt_Input_Model !== 'undefined' && $scope.APNP_Cmmnt_Input_Model !== null && $scope.APNP_Cmmnt_Input_Model !== "") {
				APNPData['Cmmnt'] = $scope.APNP_Cmmnt_Input_Model;
			}else{
				APNPData['Cmmnt'] = "NONE";
			}
			
		}	
		//eof
		
		//function to read AQX vars. No return
		function ReadAQXData(){
			
			
			if (typeof $scope.AQX_Cmmnt_Input_Model !== 'undefined' && $scope.AQX_Cmmnt_Input_Model !== null && $scope.AQX_Cmmnt_Input_Model !== "") {
				AQXData['Cmmnt'] = $scope.AQX_Cmmnt_Input_Model;
			}else{
				AQXData['Cmmnt'] = "NONE";
			}			
			
		}
		//eof
		
		//function to read MED vars. No return		
		function ReadMEDData(){
			
			
			if (typeof $scope.MED_Cmmt_Input_Model !== 'undefined' && $scope.MED_Cmmt_Input_Model !== null) {
				MEDData['Cmmnt'] = $scope.MED_Cmmt_Input_Model;
			}else{
				MEDData['Cmmnt'] = "NONE";
			}	
			
			
		}
		//eof
		
		//function to read INJuries vars. No return
		function ReadINJData(){

			if (typeof $scope.INJ_Cmmt_Input_Model !== 'undefined' && $scope.INJ_Cmmt_Input_Model !== null) {
				INJData['Cmmnt'] = $scope.INJ_Cmmt_Input_Model;
			}else{
				INJData['Cmmnt'] = "NONE";
			}
			
		}
		//eof
		
		//function to read Body Comp vars. No return
		function ReadBCData(){
			
			
			//input text values
			
			
			if (typeof $scope.Weight_BC_Input_Model !== 'undefined' && $scope.Weight_BC_Input_Model !== null && $scope.Weight_BC_Input_Model !== "") {
				BodyCompData['Weight'] = $scope.Weight_BC_Input_Model;
			}else{
				BodyCompData['Weight'] = "NONE";
			}			

			if (typeof $scope.TrgtWght_BC_Input_Model !== 'undefined' && $scope.TrgtWght_BC_Input_Model !== null && $scope.TrgtWght_BC_Input_Model !== "") {
				BodyCompData['TargetWeight'] = $scope.TrgtWght_BC_Input_Model;
			}else{
				BodyCompData['TargetWeight'] = "NONE";
			}   
                        
			if (typeof $scope.FatMass_BC_Input_Model !== 'undefined' && $scope.FatMass_BC_Input_Model !== null && $scope.FatMass_BC_Input_Model !== "") {
				BodyCompData['FatMass'] = $scope.FatMass_BC_Input_Model;
			}else{
				BodyCompData['FatMass'] = "NONE";
			}			

			if (typeof $scope.MuscleMass_BC_Input_Model !== 'undefined' && $scope.MuscleMass_BC_Input_Model !== null && $scope.MuscleMass_BC_Input_Model !== "") {
				BodyCompData['MuscleMass'] = $scope.MuscleMass_BC_Input_Model;
			}else{
				BodyCompData['MuscleMass'] = "NONE";
			}

			if (typeof $scope.BMI_BC_Input_Model !== 'undefined' && $scope.BMI_BC_Input_Model !== null && $scope.BMI_BC_Input_Model !== "") {
				BodyCompData['BMI'] = $scope.BMI_BC_Input_Model;
			}else{
				BodyCompData['BMI'] = "NONE";
			}

			if (typeof $scope.FatPer_BC_Input_Model !== 'undefined' && $scope.FatPer_CC_Input_Model !== null && $scope.FatPer_BC_Input_Model !== "") {
				BodyCompData['FatPer'] = $scope.FatPer_BC_Input_Model;
			}else{
				BodyCompData['FatPer'] = "NONE";
			}

			if (typeof $scope.InBodyScore_BC_Input_Model !== 'undefined' && $scope.InBodyScore_BC_Input_Model !== null && $scope.InBodyScore_BC_Input_Model !== "") {
				BodyCompData['InBodyScore'] = $scope.InBodyScore_BC_Input_Model;
			}else{
				BodyCompData['InBodyScore'] = "NONE";
			}

			if (typeof $scope.BasMet_BC_Input_Model !== 'undefined' && $scope.BasMet_BC_Input_Model !== null && $scope.BasMet_BC_Input_Model !== "") {
				BodyCompData['BasMet'] = $scope.BasMet_BC_Input_Model;
			}else{
				BodyCompData['BasMet'] = "NONE";
			}

			if (typeof $scope.ViscFat_BC_Input_Model !== 'undefined' && $scope.ViscFat_BC_Input_Model !== null && $scope.ViscFat_BC_Input_Model !== "") {
				BodyCompData['ViscFat'] = $scope.ViscFat_BC_Input_Model;
			}else{
				BodyCompData['ViscFat'] = "NONE";
			}

			if (typeof $scope.Flex_BC_Input_Model !== 'undefined' && $scope.Flex_BC_Input_Model !== null && $scope.Flex_BC_Input_Model !== "") {
				BodyCompData['Flex'] = $scope.Flex_BC_Input_Model;
			}else{
				BodyCompData['Flex'] = "NONE";
			}

			if (typeof $scope.MR_BC_Input_Model !== 'undefined' && $scope.MR_BC_Input_Model !== null && $scope.MR_BC_Input_Model !== "") {
				BodyCompData['MR'] = $scope.MR_BC_Input_Model;
			}else{
				BodyCompData['MR'] = "NONE";
			}

			if (typeof $scope.Rep_BC_Input_Model !== 'undefined' && $scope.Rep_BC_Input_Model !== null && $scope.Rep_BC_Input_Model !== "") {
				BodyCompData['Repetitions'] = $scope.Rep_BC_Input_Model;
			}else{
				BodyCompData['Repetitions'] = "NONE";
			}

			if (typeof $scope.HydrtnLvl_BC_Input_Model !== 'undefined' && $scope.HydrtnLvl_BC_Input_Model !== null && $scope.HydrtnLvl_BC_Input_Model !== "") {
				BodyCompData['HydrtnLvl'] = $scope.HydrtnLvl_BC_Input_Model;
			}else{
				BodyCompData['HydrtnLvl'] = "NONE";
			}


                        
			if (typeof $scope.MsclCntrl_BC_Input_Model !== 'undefined' && $scope.MsclCntrl_BC_Input_Model !== null && $scope.MsclCntrl_BC_Input_Model !== "") {
				BodyCompData['MuscleCntrl'] = $scope.MsclCntrl_BC_Input_Model;
			}else{
				BodyCompData['MuscleCntrl'] = "NONE";
			} 
                        
			if (typeof $scope.FatCntrl_BC_Input_Model !== 'undefined' && $scope.FatCntrl_BC_Input_Model !== null && $scope.FatCntrl_BC_Input_Model !== "") {
				BodyCompData['FatCntrl'] = $scope.GrsCntrl_BC_Input_Model;
			}else{
				BodyCompData['FatCntrl'] = "NONE";
			}  
                    
			if (typeof $scope.BC_OtherVarName_Input_Model !== 'undefined' && $scope.BC_OtherVarName_Input_Model !== null && $scope.BC_OtherVarName_Input_Model !== "") {
				BodyCompData['OtherVarName'] = $scope.BC_OtherVarName_Input_Model;
			}else{
				BodyCompData['OtherVarName'] = "NONE";
			} 
                        
			if (typeof $scope.BC_OtherVarValue_Input_Model !== 'undefined' && $scope.BC_OtherVarValue_Input_Model !== null && $scope.BC_OtherVarValue_Input_Model !== "") {
				BodyCompData['OtherVarValue'] = $scope.BC_OtherVarValue_Input_Model;
			}else{
				BodyCompData['OtherVarValue'] = "NONE";
			}     
                        
			
	
			
		}
		//eof
		
		//function to read Physio Vars. No return
		function ReadPVData(){
			
			if (typeof $scope.PV_HeartRate_Input_Model !== 'undefined' && $scope.PV_HeartRate_Input_Model !== null && $scope.PV_HeartRate_Input_Model !== "") {
				PVData['HeartFreq'] = $scope.PV_HeartRate_Input_Model;
			}else{
				PVData['HeartFreq'] = "NONE";
			}

			if (typeof $scope.PV_BldPrssr_Input_Model !== 'undefined' && $scope.PV_BldPrssr_Input_Model !== null && $scope.PV_BldPrssr_Input_Model !== "") {
				PVData['BldPrssr'] = $scope.PV_BldPrssr_Input_Model;
			}else{
				PVData['BldPrssr'] = "NONE";
			}                    
                        
			if (typeof $scope.PV_Glycemia_Input_Model !== 'undefined' && $scope.PV_Glycemia_Input_Model !== null && $scope.PV_Glycemia_Input_Model !== "") {
				PVData['Glycemia'] = $scope.PV_Glycemia_Input_Model;
			}else{
				PVData['Glycemia'] = "NONE";
			}     

			if (typeof $scope.PV_SO2_Input_Model !== 'undefined' && $scope.PV_SO2_Input_Model !== null && $scope.PV_SO2_Input_Model !== "") {
				PVData['SO2'] = $scope.PV_SO2_Input_Model;
			}else{
				PVData['SO2'] = "NONE";
			}                       

			if (typeof $scope.PV_WaistCirc_Input_Model !== 'undefined' && $scope.PV_WaistCirc_Input_Model !== null && $scope.PV_WaistCirc_Input_Model !== "") {
				PVData['WaistCirc'] = $scope.PV_WaistCirc_Input_Model;
			}else{
				PVData['WaistCirc'] = "NONE";
			}
                        
			if (typeof $scope.PV_VO2Max_Input_Model !== 'undefined' && $scope.PV_VO2Max_Input_Model !== null && $scope.PV_VO2Max_Input_Model !== "") {
				PVData['VO2Max'] = $scope.PV_VO2Max_Input_Model;
			}else{
				PVData['VO2Max'] = "NONE";
			}
                        
			if (typeof $scope.PV_OtherVarName_Input_Model !== 'undefined' && $scope.PV_OtherVarName_Input_Model !== null && $scope.PV_OtherVarName_Input_Model !== "") {
				PVData['OtherVarName'] = $scope.PV_OtherVarName_Input_Model;
			}else{
				PVData['OtherVarName'] = "NONE";
			}                        

			if (typeof $scope.PV_OtherVarValue_Input_Model !== 'undefined' && $scope.PV_OtherVarValue_Input_Model !== null && $scope.PV_OtherVarValue_Input_Model !== "") {
				PVData['OtherVarValue'] = $scope.PV_OtherVarValue_Input_Model;
			}else{
				PVData['OtherVarValue'] = "NONE";
			} 
   
		}
		//eof


                //function to read Nutrition data
                //FIXME: add here
                
                
                //function to read Physiotherapy data
                //FIXMe: add here


		//-----APP functions ---------	
	
		//function to return APP Insert dB string
		function CreateAPPInsertString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=InsertAPP&PatientID_Token="+URLParams.ID;
                        
                        if(APPData['Hypertension']!=="NONE")URL+="&Hypertension_Token="+APPData['Hypertension'];
                        if(APPData['Diabetes ']!=="NONE")URL+="&Diabetes_Token="+APPData['Diabetes'];
                        if(APPData['Cardiomyopathy']!=="NONE")URL+="&Cardiomyopathy_Token="+APPData['Cardiomyopathy'];
                        if(APPData['Obesity']!=="NONE")URL+="&Obesity_Token="+APPData['Obesity'];
                        if(APPData['Dyslipidemia']!=="NONE")URL+="&Dyslipidemia_Token="+APPData['Dyslipidemia'];                        
                        if(APPData['Depression']!=="NONE")URL+="&Depression_Token="+APPData['Depression'];
                        if(APPData['Alcohol']!=="NONE")URL+="&Alcohol_Token="+APPData['Alcohol'];
                        if(APPData['Tobacco']!=="NONE")URL+="&Tobacco_Token="+APPData['Tobacco'];
                        if(APPData['Cmmnt']!=="NONE")URL+="&APP_Cmmnt_Token="+APPData['Cmmnt'];
                        if(APPData['Sedentarism']!=="NONE")URL+="&APP_Cmmnt_Token="+APPData['Sedentarism'];
                        return URL;
		}
		//eof	

	
		//function to return APP UpdatedB string
		//tested ok
		function CreateAPPUpdateString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=UpdateAPP&PatientID_Token="+URLParams.ID;
                        if(APPData['Hypertension']!=="NONE")URL+="&Hypertension_Token="+APPData['Hypertension'];
                        if(APPData['Diabetes ']!=="NONE")URL+="&Diabetes_Token="+APPData['Diabetes'];
                        if(APPData['Cardiomyopathy']!=="NONE")URL+="&Cardiomyopathy_Token="+APPData['Cardiomyopathy'];
                        if(APPData['Obesity']!=="NONE")URL+="&Obesity_Token="+APPData['Obesity'];
                        if(APPData['Dyslipidemia']!=="NONE")URL+="&Dyslipidemia_Token="+APPData['Dyslipidemia'];                        
                        if(APPData['Depression']!=="NONE")URL+="&Depression_Token="+APPData['Depression'];
                        if(APPData['Alcohol']!=="NONE")URL+="&Alcohol_Token="+APPData['Alcohol'];
                        if(APPData['Tobacco']!=="NONE")URL+="&Tobacco_Token="+APPData['Tobacco'];
                        if(APPData['Cmmnt']!=="NONE")URL+="&APP_Cmmnt_Token="+APPData['Cmmnt'];
                        if(APPData['Sedentarism']!=="NONE")URL+="&APP_Cmmnt_Token="+APPData['Sedentarism'];
                        return URL;
                        
                        
                        
                        
			
		}
		//eof
		
		//function to return APP SelectdB String
		function SelectAPPSelectString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectAPP&PatientID_Token";
			return URL;
		}
		//eof
		
		//-----APNP functions ---------	
		
		//function to return APNP Insert dB string
		function CreateAPNPInsertString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=InsertAPNP&PatientID_Token";
			URL += "&APNP_Cmmnt_Token="+APNPData['Cmmnt'];
			return URL;
		
		}
		//eof		
	
		//function to return APNP Updated dB string
		function CreateAPNPUpdateString(){
			
                        //FIXME: where to read the RowID
			var URL = "../engine/dBInterface.php?ActionDBToken=UpdateAPNP&RowID_Token="+URLParams.RowID;
			URL += "&APNP_Cmmnt_Token="+APNPData['Cmmnt'];
			return URL;
		
		}
		//eof
		
		//function to select APNP Select dB String
		function CreateAPNPSelectString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectAPNP&PatientID_Token";
			return URL;
		}
		//eof
		
		
		//-----MED functions ---------	
		
		//function to return MED Insert dB string
		function CreateMEDInsertString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=InsertMED&PatientID_Token";
			URL += "&Cmmnt_Token="+MEDData['Cmmnt'];
			return URL;
		}
		
		//function to return MED Update dB string
		function CreateMEDUpdateString(){
			
                        //FIXME:read the RowID from some control, not from URLParams
			var URL = "../engine/dBInterface.php?ActionDBToken=UpdateMED&RowID_Token="+URLParams.RowID;
			URL += "&MED_Cmmnt_Token="+MEDData['Cmmnt'];
			return URL;
		}
		
		//function to return MED dB Select String
		function CreateMEDSelectString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectMED&PatientID_Token";
			return URL;			
		}
		//eof

		//-----INJ functions ---------
		
		//function to return INJuries Update dB string
		function CreateINJInsertString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=InsertINJ&Patient_IDToken";
			URL += "&INJ_Cmmnt_Token="+INJData['Cmmnt'];
			return URL;			
		}
		//eof
		
		//function to return INJuries Update dB string
		function CreateINJUpdateString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=UpdateINJ&RowID_Token="+URLParams.RowID;
			URL += "&INJ_Cmmnt_Token="+INJData['Cmmnt'];
			return URL;			
		}
		//eof
		
		//function to return INJ Select dB String
		function CreateINJSelectString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectINJ&PatientID_Token";
			return URL;				
		}
		//eof

		//-----Physio functions ---------
		
		//function to return Physio Insert dB string
		function CreatePVInsertString(){

                    var URL = "../engine/dBInterface.php?ActionDBToken=InsertHistoryTest";
                    URL+="&PatientID_Token="+URLParams.ID;
                    if(PVData['HeartFreq']!=="NONE")URL+="&HeartFreq_Token="+PVData['HeartFreq'];
                    if(PVData['BldPrssr']!=="NONE")URL+="&BldPrssr_Token="+PVData['BldPrssr'];
                    if(PVData['Glycemia']!=="NONE")URL+="&Glycemia_Token="+PVData['Glycemia'];
                    if(PVData['SO2']!=="NONE")URL+="&SO2_Token="+PVData['SO2'];
                    if(PVData['WaistCirc']!=="NONE")URL+="&WaistCirc_Token="+PVData['WaistCirc'];
                    if(PVData['VO2Max']!=="NONE")URL+="&VO2Max_Token="+PVData['VO2Max'];
                    if(PVData['OtherVarName']!=="NONE"&&PVData['OtherVarValue']!=="NONE")URL+="&"+PVData['OtherVarName']+"="+PVData['OtherVarValue'];
                    //alert("(DEBUG)CreatePVInsertString()-Return URL="+URL);
                    return URL;
		}
		//eof
		
		//function to return Physio Update dB string
		function CreatePVUpdateString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=UpdatePV&RowIDToken="+URLParams.RowID;
			//FIXME:add content
			return URL;
		}
		//eof
		
		//function to return Physio Select dB string
		function CreatePVSelectString(){
			
			//FIXME:add content
			
		}
		//eof

		//-----Body composition functions ---------
		
		//function to return body Comp Insert dB string
		function CreateBodyCompInsertString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=InsertBodyComp";
			URL += "&PatientID_Token="+URLParams.ID;
			if(BodyCompData.Weight!=="NONE")URL += "&Weight_Token="+BodyCompData.Weight;
			if(BodyCompData.FatMass!=="NONE")URL += "&FatMass_Token="+BodyCompData.FatMass;
			if(BodyCompData.MuscleMass!=="NONE")URL += "&MuscleMass_Token="+BodyCompData.MuscleMass;
			if(BodyCompData.BMI!=="NONE")URL += "&BMIToken="+BodyCompData.BMI;
			if(BodyCompData.FatPer!=="NONE")URL += "&FatPer_Token="+BodyCompData.FatPer;
			if(BodyCompData.InBodyScore!=="NONE")URL += "&InBodyScore_Token="+BodyCompData.InBodyScore;
			if(BodyCompData.BasMet!=="NONE")URL += "&BasMet_Token="+BodyCompData.BasMet;
			if(BodyCompData.ViscFat!=="NONE")URL += "&ViscFat_Token="+BodyCompData.ViscFat;
			if(BodyCompData.Flex!=="NONE")URL += "&Flex_Token="+BodyCompData.Flex;
			if(BodyCompData.MR!=="NONE")URL += "&MR_Token="+BodyCompData.MR;
			//alert("(DEBUG)CreateBodyCompInsertString() executed. Return URL="+URL);
			return URL;
			
		}
		//eof
		
		//function to return body Comp Update dB string
		function CreateBodyCompUpdateString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=UpdateBodyComp&RowIDToken="+URLParams.RowID;
			URL += "&PatientIDToken="+URLParams.ID;
			URL += "&WeightToken="+BodyCompData.Weight;
			URL += "&FatMassToken"+BodyCompData.FatMass;
			URL += "&MuscleMassToken="+BodyCompData.MuscleMass
			URL += "&BMIToken="+BodyCompData.BMI;
			URL += "&FatPerToken="+BodyCompData.FatPer;
			URL += "&InBodyScore="+BodyCompData.InBodyScore;
			URL += "&BasMet="+BodyCompData.BasMet;
			URL += "&ViscFat="+BodyCompData.ViscFat;
			URL += "&Flex="+BodyCompData.Flex;
			URL += "&MR="+BodyCompData.MR;
			//alert("(DEBUG)CreateBodyCompUpdateString() executed. Return URL="+URL);
			return URL;
			
		}
		//eof
		
		//function to return Body Comp Select dB string
		function CreateBodyCompSelectString(){
			
			var URL = "../engine/dBInterface.php?ActionDBToken=SelectBodyComp&PatientIDToken";	
			return URL;	
		}
		//eof
		
		//2. Create <patient> Search string, by ID arg (taken from URL "ID" arg)
		// returns URL string
                           
		function CreatePatientSearchStringByID () {
			
			var URLstring = "../engine/dBInterface.php?ActionDBToken=SelectPatient";
			URLstring+="&PatientID_Token="+URLParams.ID;
			//alert("(DEBUG)CreatePatientSearchString() - Patient Search String="+URLstring);
			return URLstring;
			
		}
		//end of function		
		
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
		
                $scope.PV_Save=function(){
                
                    ResetPVFieldValues();
                    ReadPVData();
                    CalldBEngine(CreatePVInsertString(),"PVData");
                    alert("(DEBUG)PV_Save()-executed");
                
                }
                
                $scope.BC_Save=function(){
                    
                    ResetBCFieldValues();
                    ReadBCData();
                    CreateBodyCompInsertString();
                    
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

		//7.3 Function to call php server file, in $address
		//FIXME: add the .error part
		function CalldBEngine(URLstring,OutputType) {			
			
			
			//alert("(DEBUG)Function CallPHPServerFile() calling"); //(DEBUG)			
			$http.get(URLstring)
			.success(function(data){
				
			if(OutputType=="CompanyList"){	
				$scope.CompanyList = data; //companyID list from mySQL
				$scope.CompanyList.push("");//empty options
			}else if(OutputType=="data"){
				$scope.data=data;
			}else if(OutputType=="PatientData"){
				$scope.PatientData=data;
			}else if(OutputType=="PVData"){
				$scope.PVData=data;
			}
			
			})
			
			//alert("(DEBUG)Function CalldBEngine() executed on URL="+URLstring); //(DEBUG)

		}
		//eof	
		
		
		//8. Init Function to call Main with parameter Type
		$scope.Init = function(Type) {
			Main(Type);			
		}
		
		//debug function
		$scope.dg = function(){
			alert("(DEBUG) Oh yeaaaahhh!(APP)");
			ResetAPPFieldValues();
			ReadAPPData();
			CreateAPPUpdateString();
		}
		
		//debug function for company
		$scope.dg_company = function(){
			//alert("(DEBUG) Starting Debug function(Company)");
			ReadCompanyFields();
			CreateCompanyEditString();

		}
		

		
		//9. MAIN function to execute scripts
		// Arg Type="Patient" or "Company". Its set by HTML controller tag
		// return true if succesfully executed
		function Main (Type) {	
			
			//alert("(DEBUG)Main()-starting with Type="+Type); 
			
                        
                        
			//check parameters
                        
			if(CheckURLParameters()==true){

				if(Type=='Patient' && URLParams.Action=="SearchPatient"){
					
					CalldBEngine(CreatePatientSearchStringByID(),"PatientData");
                                        //alert("(DEBUG)Main()- Search patient executed");
					return true;
				}else{
					//ActionParam is undefined
					//alert("(DEBUG)Main - Finishing Main without search");
					return false;
				}
				
				
				
			}else{
				//failed the URL args validation
                                //alert("(DEBUG)Main()- Ending because of Invalid Args. Return  FALSE");
				return false;
			}
					
			
		} 	
		
	
	//---------------END OF FUNCT DEF-------------------------
	
	//---------------Executing Script
	//Main('Patient');
	
	
	}]);
