//fichiers pour le bulles
import bubblecss from "../../bubbles/dist/main.css";
import bubbleCalcul from "../../bubbles/dist/main.js";
import bubbleAnim from "../../bubbles/dist/anims.js";

//charte + grid
import framework from "../../framework/dist/main.css";

//fichier CSS principal
import style from "./styles/style.scss";

//tag XITI
import xiti from "./scripts/data-xiti.js";

//plugin de lazyloading
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;

//js des push produits
import pushProds from "./scripts/managePushProds.js";