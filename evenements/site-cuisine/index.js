//fichier CSS principal
import style from "./styles/style.scss";

import scrollMonitor from "./scripts/scrollMonitor.js";

import { Distancer } from "./scripts/distancer.js";

import magasins from "./scripts/magasins.js";

//tag XITI
import xiti from "../../_global/scripts/data-xiti.js";

//plugin de lazyloading
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;


$j(document).ready(function() {
	$j(".menu__sim").on("click", function(){
		$j(".menu__root").toggleClass("show");
		$j(".menu__ul").slideToggle();
	});

	$j(window).on('scroll', function(){
		var limitTop = $j('.page-evenement').offset().top;
		var limitBottom = $j('#footer').offset().top;
		var scroll = $j(window).scrollTop();
		var nav = $j(".menu__root");
		var btn = $j(".cuisine__btn-all");
		var navHeight = nav.outerHeight();

		if( scroll >= limitTop ) {
			nav.addClass('fixed');
			btn.addClass('fixed');
		} else {
			nav.removeClass('fixed');
			btn.removeClass('fixed');
		}

		if( scroll + navHeight >= limitBottom ) {
			nav.addClass('fixed-bottom');
		} else {
			nav.removeClass('fixed-bottom');
		}

		if( scroll + $j(window).height() >= limitBottom ) {
			btn.removeClass('fixed');
		}

		if($j(".menu__root").hasClass("show")){
			$j(".menu__sim").trigger("click")
		}
	});
	$j(window).trigger('scroll');

	$j(".frise__item").each(function(){
		var that = $j(this);
		var space = $j("<div class='frise__space'></div>");

		that.before(space);

		scrollMonitor.create(space, 50).enterViewport(function () {
			this.destroy();

			space.addClass("resize");
		});
	})
});

$j(window).on("load", function(){
	$j.userposition = 0;
	navigator.geolocation.getCurrentPosition(function(userposition){
		let closest = {distance:100000000000000000, poi : false};
		let nearby = [];
		const radius = 10;
		$j.each(magasins, function(i, poi){
			let distancer = new Distancer();
			distancer.setOrigin({
				lat: userposition.coords.latitude,
				lon: userposition.coords.longitude,
			});
			distancer.setDestination({
				lat: poi.latitude,
				lon: poi.longitude,
			});
			distancer.setMetric("K");
			const distance = distancer.calculateDistance();

			if(distance < closest.distance){
				closest = {
					distance:distance,
					poi : poi
				};
			}

			if(Math.floor(distance) <= radius){
				nearby.push(poi);
			}
		});
		console.log(closest)
		console.log(nearby);
	}, function(error){
		$j.userposition = false;
	});
})