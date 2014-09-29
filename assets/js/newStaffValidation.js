$(document).ready(function() {
	
	$.validator.addMethod("checkDate", function(value, element){

		var dateToCheck = new Date(value);
	
		if (dateToCheck >= new Date()){
			return false;
		}
		
		return true;		
	});

	$(".form-signin").validate({		
		rules : {
			firstName : {
				required : true
			},
			lastName : {
				required : true,
			},
			email : {
				required : true,
				email : true
			},
			password : {
				required : true,
				minlength : 3,
			},
			passwordConfirmation : {
				required : true,
				equalTo : "#password"
			},
			birthDate : {				
				checkDate: true				
			},
			hireDate : {
				checkDate: true
			}
		},
		messages : {
			passwordConfirmation : "Must match 'password' field.",
			birthDate : "Please check birth date value.",
			hireDate : "Please check hire date value."
		},
		success : function(element){
			element.addClass("valid");
		}
	});

}); 
