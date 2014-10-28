$(document).ready(function() {

	$(".country-form").validate({		
		rules : {
			countryName : {
				required : true
			}
		},
		success : function(element){
			element.addClass("valid");
		}
	});

}); 
