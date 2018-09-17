//fichier CSS principal
import style from "./styles/style.scss";

//Swiper plugin
import Swiper from "swiper/dist/js/swiper.min.js";
import SwiperCSS from "swiper/dist/css/swiper.css";


//plugin de lazyloading
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;


$j(document).ready(function() {

	$j(".nav-sim__current").not('a').on("click", function(){
		$j(".nav-sim__menu").toggleClass("show");
	});
	$j(".nav-sim__close").on("click", function(){
		$j(".nav-sim__menu").removeClass("show");
	})

	$j(".js-back-to-top").on("click", function(){
		$j('html, body').animate({
			scrollTop: 0
		}, 500);
		return false;
	})

	$j(".swiper-container").each(function(){
		var that = $j(this);

		var swiper = new Swiper(this, {
			speed: 400,
			slidesPerView: 3,
			// centeredSlides: true,
			spaceBetween: 30,
			slidesPerGroup: 3,
			pagination: {
				el: '.swiper-pagination',
				clickable : true
			},
			on: {
				init: function () {
					if(that.find(".swiper-pagination").children().length < 2){
						that.find(".swiper-pagination").hide();
					}else{
						that.find(".swiper-pagination").show();
					}
					this.update();
				},
				resize : function(){
					if(that.find(".swiper-pagination").children().length < 2){
						that.find(".swiper-pagination").hide();
					}else{
						that.find(".swiper-pagination").show();
					}
				}
			},
			breakpoints: {
				340: {
					slidesPerView: 1.3,
					spaceBetween: 10,
					freeMode:true
				},
				420: {
					slidesPerView: 1.5,
					spaceBetween: 20,
					freeMode: true
				},
				640: {
					slidesPerView: 1.8,
					spaceBetween: 30,
					freeMode: true
				},
				768: {
					slidesPerView: 2.5,
					spaceBetween: 30,
					freeMode: true
				},
			},
		});



		if(that.find(".swiper-pagination").children().length < 2){
			that.find(".swiper-pagination").hide();
		}else{
			that.find(".swiper-pagination").show();
		}
	});

	$j(window).on("load", function(){
		if($j(".swiper-container").length){
			$j(".swiper-container").each(function(){
				this.swiper.update()
			})
		}
	})
});