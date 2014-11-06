$(document).ready(function() {

	$(".cities-form").validate({		
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
