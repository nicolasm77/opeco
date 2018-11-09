//fichier CSS principal
import style from "./styles/style.scss";

//Swiper plugin
// import Swiper from "swiper/dist/js/swiper.min.js";
// import SwiperCSS from "swiper/dist/css/swiper.css";

//charte + grid
import framework from "frameworkHUB/dist/main.css";

//tag XITI
import xiti from "../../_global/scripts/data-xiti.js";

//plugin de lazyloading
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;

// compteur
import flip from "./scripts/flipclock.min.js";


$j(document).ready(function() {
    var n = new Date,
	e = new Date('November 19, 2018 08:00:00').getTime()/1e3-n.getTime()/1e3;
	$j('.black-friday__countdown__clock').FlipClock(e,{
		clockFace: 'DailyCounter',
		countdown: true
	});
	$j('.black-friday__countdown').each(function(n){
		$j('.black-friday__countdown').append('<div class="black-friday__countdown__labels labels"><label>Jours</label><label>Heures</label><label>Minutes</label><label>Secondes</label></div>')
	}),
	$j('.flip-clock-divider').each(function(n){
		$j(this).insertAfter($j(this).next('ul.flip').next('ul.flip'));
	});
});