$(document).ready(function(){
	
	$('.launch-modal').click(function(){
							
	$('#myModal').modal({
		backdrop: 'static'
	});
							
	$('#myModal2').modal({
		backdrop: 'static'
	});	
							
							
	$('#myModal').on('hidden.bs.modal', function (e) {
		$("#myModal2").modal("hide");
	})
	
	$('#myModal2').on('hidden.bs.modal', function (e) {
		$("#myModal").modal("hide");
	})							
							
	//patients save event
	$('#save-event').on('click',function(evt){
		//put here code to execute when SAVE button is pressed								
		//alert("(DEBUG)Modal() - Starting save patient process");
		angular.element(document.getElementById('PatientController')).scope().CreatePatient();
		}	
	);
							
	//companies save event 
	$('#save-event2').on('click',function(evt){
		//put here code to execute when SAVE button is pressed								
		//alert("(DEBUG)Modal() - Starting save company process");
		angular.element(document.getElementById('CompanyController')).scope().CreateCompany();
		//alert("(DEBUG)Modal() - Save company process ended");
		}	
	);							
							
	}); 
});