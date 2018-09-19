/*jshint esversion: 6 */

/*! Main CSS */
import style from "./styles/style.scss";

/*! Swiper plugin */
//import Swiper from "swiper/dist/js/swiper.min.js";
//import SwiperCSS from "swiper/dist/css/swiper.css";

/*! XITI */
import xiti from "../../_global/scripts/data-xiti.js";
import jquerycolor from "./scripts/jquery.color.js";
import onload from "./scripts/onload.js";

style, xiti, jquerycolor, onload;

/*! Lazyload */
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;