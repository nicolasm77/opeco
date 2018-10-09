//fichiers pour le bulles
import bubblecss from "bubbles/src/sass/bubble.scss";
import bubbleCalcul from "bubbles/dist/main.js";
import bubbleAnim from "bubbles/dist/anims.js";

//charte + grid
import framework from "frameworkHUB/dist/main.css";

//fichier CSS principal
import style from "./styles/style.scss";

//tag XITI
import xiti from "../../_global/scripts/data-xiti.js";

//plugin de lazyloading
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;

//js des push produits
import pushProds from "../../_global/tpl_portail/scripts/managePushProds.js";

$j(function(){
	setTimeout(function(){
		$j('.articles__root .hub-row').scrollLeft($j(this).width()/1.6);
	}, 1000);
});