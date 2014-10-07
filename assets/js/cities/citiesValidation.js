$(document).ready(function() {

	$(".form-signin").validate({		
		rules : {
			cityName : {
				required : true
			}
		},
		success : function(element){
			element.addClass("valid");
		}
	});

}); 
