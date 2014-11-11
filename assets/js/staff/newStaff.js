$(document).ready(function() {

	function previewImage(image) {
		if (image.files && image.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#img_preview').attr('src', e.target.result);
			};
			reader.readAsDataURL(image.files[0]);
		}
	}

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

	$("#image").on("change", function() {
		previewImage(this);
	});

});
