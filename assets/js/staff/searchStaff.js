$(document).ready(function() {

	if (window.location.href.contains("search") && window.location.href.contains("staff")) {

		function parseResults(arr) {

			var str = "";

			arr.forEach(function(member) {
				
				var isAdmin = member.isAdmin ? "Yes" : "No";
				str = str + "<tr>" + "<td class='table_spacing'>" + member.firstName + " " + member.lastName + "</td>" + "<td class='table_spacing'>" + member.email + "</td>" + "<td class='table_spacing'>" + isAdmin + "</td>" + "</tr>";

			});

			$("#searchResults").empty();
			$("#searchResults").append("<table>" + "<thead>" + "<th class='table_spacing'>Name</th>" + "<th class='table_spacing'>Email</th>" + "<th class='table_spacing'>isAdmin</th>" + "</thead>" + "<tbody>" + str + "</tbody>" + "</table>");

		};

		$("#searchBox").on("input", function() {

	
			if ($("#searchBox").val() == "") {
				$("#searchResults").empty();
				return false;
			}
			
			var searchUrl = "";
					
			if ($("#filter").val() == 0){
				searchUrl = "/admin/staff/search/results?query=" + $("#searchBox").val();
			}else{
				searchUrl = "/admin/staff/search/results?query=" + $("#searchBox").val() + "&city=" +
				$("#city").val() + "&admin=" + $("#adminDD").val();
			}
			
			console.log("searchURL", searchUrl);

			$.ajax({
				url : searchUrl,
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

		//this needs some refactoring...
		$("#filter").on("click", function() {

			var self = $(this);

			self.val() == 0 ? self.val(1) : self.val(0);

			if (self.val() == 0) {
				$("#city").attr("disabled", "disabled");
				$("#adminDD").attr("disabled", "disabled");
			} else {
				$("#city").removeAttr("disabled");
				$("#adminDD").removeAttr("disabled");
			}

		});

		$("#city").attr("disabled", "disabled");
		$("#adminDD").attr("disabled", "disabled");
	}

});
