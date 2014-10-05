$(document).ready(function() {

	if (window.location.href.contains("search") && window.location.href.contains("staff")) {

		function parseResults(arr) {

			var str = "";

			arr.forEach(function(member) {
				str = str + "<tr>" + 
								"<td class='table_spacing'>" + 
									member.firstName + " " + member.lastName + 
								"</td>" + 
								"<td class='table_spacing'>" + member.email + 
								"</td>" +
								"<td class='table_spacing'>" +
								    member.isAdmin +
								"</td>" +
							  "</tr>";
				
			});

			$("#searchResults").empty();
			$("#searchResults").append(
				"<table>" + 
					"<thead>" + 
						"<th class='table_spacing'>Name</th>" +
						"<th class='table_spacing'>Email</th>" + 
						"<th class='table_spacing'>isAdmin</th>" + 
					"</thead>" +					
					"<tbody>" + 
						str + 
					"</tbody>" + 
				"</table>");

		};

		$("#searchBox").on("input", function() {

			if($("#searchBox").val() == ""){
				$("#searchResults").empty();
				return false;
			}

			$.ajax({
				url : "/admin/staff/search/results?query=" + $("#searchBox").val(),
				type : "GET",
				success : function(data, textStatus, jqXHR) {

					if (data.success) {
						console.log("success", data);
						parseResults(data.members);
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$("#flash_messages").empty();
					$("#flash_messages").append("<ul class='alert alert-danger text-center' style='width:50em;'>" + "<li>ERROR MESSAGE: " + errorThrown + "</li>" + "</ul");
				}
			});

		});
	}

});
