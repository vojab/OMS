$(document).ready(function() {

	if (window.location.href.contains("edit") && window.location.href.contains("staff")) {
		$.ajax({
			url : "/admin/staff/" + $("#member_id").val() + "/getDates",
			type : "GET",
			success : function(data, textStatus, jqXHR) {
				var birthday = data.birthday != "" ? data.birthday.substring(0, 10) : "";
				var hireday = data.hireday != "" ? data.hireday.substring(0, 10) : "";
				$("#DPbirthDate").datepicker("setDate", birthday);
				$("#DPhireDate").datepicker("setDate", hireday);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log("jqXHR", jqXHR);
			}
		});
	}
});
