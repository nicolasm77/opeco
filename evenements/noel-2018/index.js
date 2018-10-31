/*jshint esversion: 6 */

/* BUBBLES */
import bubblecss from "bubbles/dist/main.css";
import bubbleCalcul from "bubbles/dist/main.js";
import bubbleAnim from "bubbles/dist/anims.js";

//custom scrollbar
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
import products from "./scripts/products.js"; // push products

/* XITI CALLS */
import xiti from "../../_global/scripts/data-xiti.js";

/* LAZY LOAD */
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;

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

});