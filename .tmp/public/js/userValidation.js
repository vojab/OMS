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
			password_confirmation : {
				required : true,
				equalTo : "#password"
			}
		},
		messages : {
			password_confirmation : "Must match 'password' field"
		},
		success : function(element){
			element.addClass("valid");
		}
	});

}); 
