function cleanHasTag(a) {
	return a.split("#")[1];
}

function changeURL(e) {
	var hashTag = window.location.hash;
	if (hashTag) {
		var a = hashTag;
		if (cleanHasTag(a) === "cuisine" || cleanHasTag(a) === "linge-maison") {
			var url = "/ajax-" + cleanHasTag(a) + ".html";
			$j.ajax({
				url: url,
				success: function (data) {
					$j('.b-content').html(data);
				}
			});
		}
	} else {
		// Fragment doesn't exist
	}
}

$j(window).on('hashchange', function (e) {
	changeURL(e);
});

$j(function () {
	$j('.page-evenement').append('<div class="b-content"></div>');
}) //.trigger('hashchange');