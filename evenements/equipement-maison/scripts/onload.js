function designLavaBar(origin){
	var selected = $j('.b-nav__link.selected');
	if(origin === undefined){
		origin = {};
		origin.pos = selected.position().left;
		origin.color = selected.attr("rel");
		origin.width = selected.width();
	}
	$j(".b-underline").css({
		left: origin.pos,
		width: origin.width,
		backgroundColor: origin.color
	});
}
function toggleLavaBar(element, status) {
	var lavaBar = $j(".b-underline");
	if (element !== undefined) {
		if (status === 'out') {
			var selected = $j('.b-nav__link.selected');
			origin = {};
			origin.pos = selected.position().left;
			origin.color = selected.attr("rel");
			origin.width = selected.width();
			lavaBar.stop().animate({
				left: origin.pos,
				width: origin.width,
				backgroundColor:origin.color
			});
		} else {
			lavaBar.width($j(".selected").parent().width())
				.css("left", origin["pos"])
				.data("origLeft", origin["pos"])
				.data("origWidth", origin["width"])
				.data("origColor", origin["color"]);
			if (element !== undefined) {
				lavaBar.stop().animate({
					left: element.position().left,
					width: element.width(),
					backgroundColor: element.attr("rel")
				});
			}
		}
	} else {
		designLavaBar();
	}
}
function Binject(a) {
	var url = "ajax-" + a + ".html";
	if ($j('.b-content')[0] === undefined) {
		$j('.page-evenement').append('<div class="b-content"></div>');
	}
	$j.ajax({
		url: url,
		success: function (data) {
			$j('.b-content').html(data);
			$j('.page-evenement a.selected').removeClass('selected');
			$j('a[href=#' + a + ']').addClass('selected');
			$j(".b-nav__link:not(.selected)").hover(function () {
				toggleLavaBar($j(this));
			},function () {
				toggleLavaBar($j(this), 'out');
			});
			setTimeout(function () {
				toggleLavaBar();
			}, 50);
		}
	});
}
function BchangeURL() {
	var hashTag = window.location.hash;
	if (hashTag) {
		var b = hashTag.split("#")[1];
		if (b === "cuisine" || b === "linge-maison") {
			Binject(b);
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
}).trigger('hashchange');