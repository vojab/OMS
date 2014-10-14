$(document).ready(function() {

	function setHeader(xhr) {		
		xhr.setRequestHeader("X-CSRF-Token", $("#csrf").val());
	}

	if (window.location.href.contains("index") && window.location.href.contains("staff")) {
		$(".btn-danger").on("click", function() {

			var row = $(this).parent().parent();

			$.ajax({
				url : "/admin/staff/" + $(this).attr("data-member"),
				type : "DELETE",
				beforeSend : setHeader,
				success : function(data, textStatus, jqXHR) {
					row.remove();
					$("#flash_messages").empty();
					$("#flash_messages").append("<ul class='alert alert-success text-center' style='width:50em;'>" + "<li>Member successfully deleted.</li>" + "</ul");
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$("#flash_messages").empty();
					$("#flash_messages").append("<ul class='alert alert-danger text-center' style='width:50em;'>" + "<li>ERROR MESSAGE: " + errorThrown + "</li>" + "</ul");
				}
			});
		});
	}
});
