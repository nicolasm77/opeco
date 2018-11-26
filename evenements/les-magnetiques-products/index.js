//fichier CSS principal
import style from "./styles/style.scss";

//tag XITI
import xiti from "../../_global/scripts/data-xiti.js";

//plugin de lazyloading
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;

//Swiper plugin
import Swiper from "swiper/dist/js/swiper.min.js";

//navbar
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $j('.page-adeqwat').before('<link rel="stylesheet" href="https://www.boulanger.com/content/static/bcom/framework/swiper/swiper.min.css">');
    var navSwiper = new Swiper('.navbar__root .swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        coverflowEffect: {
          rotate: 10,
          stretch: 0,
          depth: 90,
          modifier: 1,
          slideShadows : false,
        },
        breakpoints: {
            380: {
              slidesPerView: 1.5
            },
            500: {
                slidesPerView: 2.2
            }
          }
    });
    navSwiper.on('slideChange', function () {
        var activeMobile = $j('.navbar__root .swiper-container .swiper-slide:eq('+navSwiper.activeIndex+') .nav__item').attr('data-nav');
        $j('.article_section.active').removeClass('active');
        $j('.article_section[data-article="'+activeMobile+'"]').addClass('active');
    });
}
$j('.navbar__root .nav__item').click(function(){
    if(!$j(this).hasClass('active')){
        var art = $j(this).attr('data-nav');
        $j('.navbar__root .nav__item.active').removeClass('active');
        $j(this).addClass('active');
        $j('.article_section.active').removeClass('active');
        $j('.article_section[data-article="'+art+'"]').addClass('active');
    }
})

//video
// $j('.articles article.video .visuel').click(function(){
//     var srcIframe = $j(this).parent('.video').find('.video__content .video__frame').attr('data-src');
//     $j('body, html').css('overflow','hidden');
//     $j(this).parent('.video').find('.video__content').fadeIn().addClass('in').find('.video__frame').attr('src',srcIframe);
// })
// $j('.articles article.video').on('click','.video__content.in',function(){
//     $j('body, html').css('overflow','inherit');
//     $j(this).fadeOut().removeClass('in').find('.video__frame').attr('src','');
// })
