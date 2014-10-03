$(document).ready(function() {

	function setHeader(xhr) {
		
		console.log("SET HEADER okinut!");
		
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
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$("#flash_messages").empty();
					$("#flash_messages").append("<ul class='alert alert-danger text-center' style='width:50em;'>" + "<li>ERROR MESSAGE: " + errorThrown + "</li>" + "</ul");
				}
			});
		});
	}
});
