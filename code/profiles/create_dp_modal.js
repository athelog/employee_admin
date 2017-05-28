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
							
	//departments save event
	$('#save-event').on('click',function(evt){
		//put here code to execute when SAVE button is pressed								
		alert("(DEBUG)Modal() - Starting save department process");
		angular.element(document.getElementById('DepartmentController')).scope().CreateDepartment();
		}	
	);
						
	//departments delete event
	$('#save-event2').on('click',function(evt){
		//put here code to execute when SAVE button is pressed								
		alert("(DEBUG)Modal() - Starting delete department process");
		angular.element(document.getElementById('DepartmentController')).scope().DeleteDepartment();
		}	
	);


	}); 
});