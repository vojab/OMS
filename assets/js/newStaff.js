$(document).ready(function() {

	$("#DPbirthDate").datepicker({
		dateFormat : "yy-mm-dd",
		changeMonth : true,
		changeYear : true,
		onSelect : function(date) {
			$("#DPbirthDate").valid();
		}
	});

	$("#DPhireDate").datepicker({

		dateFormat : "yy-mm-dd",
		changeMonth : true,
		changeYear : true,
		onSelect : function(date) {
			$("#DPhireDate").valid();
		}
	});

});
