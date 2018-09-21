function BcleanHasTag(a) {
	return a.split("#")[1];
}
function Binject(a) {
	var url = "ajax-" + a + ".html";
	if ($j('.b-content')[0] === undefined) {
		$j('.page-evenement').append('<div class="b-content"></div>');
	}
	$j.ajax({
		url: url,
		success: function (data) {
			var $el, leftPos, newWidth, $magicLine = $j(".b-underline");
			$j('.b-content').html(data);
			$j('.page-evenement a.selected').removeClass('selected');
			$j('a[href=#' + a + ']').addClass('selected');

			$magicLine.width($j(".selected").parent().width())
			.css("left", $j(".selected").position().left)
			.data("origLeft", $magicLine.position().left)
			.data("origWidth", $magicLine.width())
			.data("origColor", $j(".selected").attr("rel"));
			$j(".b-nav__list a").hover(function() {
				$el = $j(this);
				leftPos = $el.position().left;
				newWidth = $el.width();
				$magicLine.stop().animate({
					left: leftPos,
					width: newWidth,
					backgroundColor: $el.attr("rel")
				});
			}, function() {
				$magicLine.stop().animate({
					left: $magicLine.data("origLeft"),
					width: $magicLine.data("origWidth"),
					backgroundColor: $magicLine.data("origColor")
				});
			});
			$j(".b-nav__list a.selected").trigger('mouseover');

		}
	});
}
function BchangeURL() {
	var hashTag = window.location.hash;
	if (hashTag) {
		if (BcleanHasTag(hashTag) === "cuisine" || BcleanHasTag(hashTag) === "linge-maison") {
			Binject(BcleanHasTag(hashTag));
		}
	} else {
		Binject('cuisine');
	}
}
$j(window).on('hashchange', function () {
	BchangeURL();
});
$j(function () {
	$j(".b-nav__list").append("<span class='b-underline'></span>");
	BchangeURL();
}).trigger('hashchange');