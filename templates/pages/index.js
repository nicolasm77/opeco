//fichier CSS principal
import style from "./styles/style.scss";

//fichiers slider
import sliderstyle from "lightslider/dist/css/lightslider.min.css";
import sliderjs from "lightslider/dist/js/lightslider.min.js";

//plugin de lazyloading
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;


$j(document).ready(function() {
    $j(".props__diapo").lightSlider({
        item: 1,
        slideMargin:0,
        pause: 3500,
        auto : true,
        loop : true,
        controls : false,
        gallery : false
    });

    $j(".video__play").on("click", function(e){
        var hasVideo = !!document.createElement('video').canPlayType && !!document.createElement('video').canPlayType('video/mp4');

        if(hasVideo){
            e.preventDefault();

            $j(this).addClass("played");
            $j(".video__elm").prop("controls", true).get(0).play();
        }
    })
});