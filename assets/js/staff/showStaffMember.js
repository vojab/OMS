$(document).ready(function() {

	if (window.location.href.contains("staff") && window.location.href.contains("details")) {
		$("select").attr("disabled", "disabled");
	}
});
