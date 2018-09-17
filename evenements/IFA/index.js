//fichier CSS principal
import style from "./styles/style.scss";

//tag XITI
import xiti from "../../_global/scripts/data-xiti.js";

//navigation via menu + traqueur du scroll
import nav from "../../_global/tpl_salon/scripts/navScroll.js";

//plugin de lazyloading
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;

//Swiper plugin
import Swiper from "swiper/dist/js/swiper.min.js";
import SwiperCSS from "swiper/dist/css/swiper.css";

$j(function(){
	if($j(".swiper-container").length){
		new Swiper('.swiper-container', {
			loop: true,
			autoplay: {
				delay: 4000,
				disableOnInteraction : false
			},
			pagination: {
				el: '.swiper-pagination',
				clickable : true
			},
			navigation: {
				nextEl: '.header__arrow--next',
				prevEl: '.header__arrow--prev',
			}
		});

		$j(window).on("load", function(){
			$j(".swiper-container").each(function(){
				this.swiper.update()
			})
		})
	}

	$j(".totop__btn").on("click", function(){
		$j('html, body').animate({
			scrollTop: $j('.sidebar__nav').offset().top
		}, 300);
	});
})
