/*jshint esversion: 6 */

/* POLYFILL */
import "./scripts/classList_polyfill.js"
import 'intersection-observer';

/* BUBBLES */
import bubblecss from "bubbles/dist/main.css";
import bubbleCalcul from "bubbles/dist/main.js";
import bubbleAnim from "bubbles/dist/anims.js";


/* TOP SCROLLBAR */
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually
import 'simplebar/dist/simplebar.css';

/* MAIN CSS */
import style from "./styles/style.scss";

/* SWIPER CAROUSEL */
// import Swiper from "swiper/dist/js/swiper.min.js";
// import SwiperCSS from "swiper/dist/css/swiper.css";

/* GIFENGINE */
import giftengine from "./scripts/giftengine.js";

/* PUSHES PRODUCTS */
import products from "./scripts/products.js";

/* GO TO TOP */
import gototop from "./scripts/gototop.js";

/* XITI CALLS */
import xiti from "../../_global/scripts/data-xiti.js";



/* LAZY LOAD */
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;

IntersectionObserver.prototype.USE_MUTATION_OBSERVER = false;

$j(function() {

	$j(".advent__calendar--decembre .advent__calendar-month").on("click", function(){
		$j(".advent__calendar--decembre").addClass("advent__calendar--open");
	});

	$j(".advent__calendar--novembre .advent__calendar-month").on("click", function(){
		$j(".advent__calendar--decembre").removeClass("advent__calendar--open");
	});

	$j(".video__item").on("click", function(){
		$j(".video__item.current").removeClass("current");
		$j(this).addClass("current");
	});

	// const myImgs = $j('.typex').get();

	// let observer = new IntersectionObserver((entry, observer) => {
	// 	console.log('entry:', entry[0].target);
	// 	console.log('observer:', observer);
	// });

	// myImgs.forEach(image => {
	// 	observer.observe(image);
	// });


	const MENU = {
		init : function(){
			const self = this;

			self.$burger = $j(".burger__itself");
			self.$burgerFixed = $j(".burger__root").not(".burger__root--header");
			self.$menu = $j(".menu__root");
			self.$close = $j(".menu__close");

			self.isDisplay = false;

			self.events();
		},

		events : function(){
			const self = this;

			self.$burger.on("click", $j.proxy(self.toggleMenu, self));
			self.$close.on("click", $j.proxy(self.toggleMenu, self));
			self.$menu.find(".menu__link").on("click", $j.proxy(self.goTo, self));

			new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.intersectionRatio > 0) {
						self.$burgerFixed.removeClass("fixed");
					} else {
						self.$burgerFixed.addClass("fixed");
					}
				});
			}).observe($j(".header__root").get(0));

			const sectionObs = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.intersectionRatio >= 0.30) {
						console.log(entry.target.id);
						$j(".menu__link").removeClass("current").filter("[href=#"+entry.target.id+"]").addClass("current");
					}
				});
			}, {threshold: [0.30]});
			$j("section[id]").get().forEach(section => {
				sectionObs.observe(section);
			});
		},

		toggleMenu : function(){
			const self = this;

			self.$menu.toggleClass("show");
			self.isDisplay = !self.isDisplay;
			self.$burgerFixed.toggleClass("menu");
		},

		goTo : function(e){
			e.preventDefault();
			const self = this;
			const scroll = $j(window).scrollTop();
			const wHeight = $j("body").height();
			const target = $j(e.currentTarget).attr("href");
			const targetTop = (target === "#section-faire-plaisir")? $j(target).offset().top -80 : $j(target).offset().top;

			self.toggleMenu();

			$j('html, body').delay(150).animate({
				scrollTop : targetTop
			}, Math.max(250, 2500*Math.abs(targetTop - scroll)/wHeight));
		}
	};

	MENU.init()
});