$(document).ready(function() {

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
			}
		},
		messages : {
			passwordConfirmation : "Must match 'password' field"
		},
		success : function(element){
			element.addClass("valid");
		}
	});

}); 
