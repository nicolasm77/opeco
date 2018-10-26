/*jshint esversion: 6 */

/* BUBBLES */
import bubblecss from "bubbles/dist/main.css";
import bubbleCalcul from "bubbles/dist/main.js";
import bubbleAnim from "bubbles/dist/anims.js";

/* MAIN SCSS */
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
});