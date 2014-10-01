$(document).ready(function() {

	$(".btn-danger").on("click", function() {

		var row = $(this).parent().parent();

		function setHeader(xhr) {
			xhr.setRequestHeader("X-CSRF-Token", $("#csrf").val());
		}

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

});
