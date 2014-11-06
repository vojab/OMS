$(document).ready(function() {

	if (window.location.href.contains("index") && window.location.href.contains("countries")) {

		function setHeader(xhr) {
			xhr.setRequestHeader("X-CSRF-Token", $("#csrf").val());
		}


		$(".btn-danger").on("click", function() {

			var row = $(this).parent().parent();

			$.ajax({
				url : "/countries/" + $(this).attr("data-member"),
				type : "DELETE",
				beforeSend : setHeader,
				success : function(data, textStatus, jqXHR) {
					console.log("SUCCESS DATA", data);
					row.remove();
					$("#flash_messages").empty();
					$("#flash_messages").append("<ul class='alert alert-success text-center' style='width:50em;'>" + "<li>Country successfully deleted.</li>" + "</ul");
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$("#flash_messages").empty();
					$("#flash_messages").append("<ul class='alert alert-danger text-center' style='width:50em;'>" + "<li>ERROR MESSAGE: " + errorThrown + "</li>" + "</ul");
				}
			});
		});
	}
});
