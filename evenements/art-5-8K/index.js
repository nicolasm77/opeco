//fichier CSS principal
import style from "./styles/style.scss";

//tag XITI
import xiti from "../../_global/scripts/data-xiti.js";

//charte + grid
import framework from "frameworkHUB/dist/main.css";

//plugin de lazyloading
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;


//nav
$j('.edito__root .nav--item').click(function(){
    if(!$j(this).hasClass('active')){
        var art = $j(this).attr('data-nav');
        $j('.edito__root .nav--item.active').removeClass('active');
        $j(this).addClass('active');
        $j('.page__root.active').removeClass('active');
        $j('.page__root[data-article="'+art+'"]').addClass('active');
    }
});

//colors
$j('.articles__root .article__item').each(function(){
    var color = $j(this).attr('data-color');
    $j(this).find('.article__item__links--link:first-child').css({'background':color,'border':'1px solid '+color});
    $j(this).find('.article__item__top__titles--subtitle').css('color',color);
})

//video
$j('.page__root .video .visuel').click(function(){
    var srcIframe = $j(this).parent('.video').find('.video__content .video__frame').attr('data-src');
    $j('body, html').css('overflow','hidden');
    $j(this).parent('.video').find('.video__content').fadeIn().addClass('in').find('.video__frame').attr('src',srcIframe);
})
$j('.page__root .video').on('click','.video__content.in',function(){
    $j('body, html').css('overflow','inherit');
    $j(this).fadeOut().removeClass('in').find('.video__frame').attr('src','');
})
