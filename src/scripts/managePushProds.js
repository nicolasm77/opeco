//Swiper plugin
import Swiper from "swiper/dist/js/swiper.min.js";
import SwiperCSS from "swiper/dist/css/swiper.css";

import number_format from "./numberFormat.js";

$j(function(){

    var managePushProds = {
        init : function(){

            this.events();
            this.run();
        },

        events : function(){
            var self = this;

            $j('.push__cart').on('click',function(e){
                e.preventDefault();
                e.stopPropagation();

                self.addToCart($j(this).closest('.push__item').attr('data-offer'), $j(this));
            });

            $j(".popcart__global__actioncart__popvalidright__continue, .popcart__closepopcart").on("click", function() {
                $j('#popcart').fadeOut();
            });
        },

        run : function(){
            var self = this;
            new Swiper('.swiper-container', swiperOptions);

            if(location.hostname !== "localhost"){
                $j(".push__item").each(function () {
                    self.getPrices($j(this));
                });
            }
        },

        getPrices : function(prod){
            var self = this;
            var cat = prod.attr("data-offer");
            var url = "/webapp/wcs/stores/servlet/BLGetDynamicOffer?leadOfferCatentryId=" + cat + "&storeId=10001&catalogId=10001&langId=-2"

            $j.getJSON(url, function (data) {
                self.updateProdHtml(prod, data);
            });
        },

        updateProdHtml : function(prod, data){
            if(!data.offer) return false;

            var reference = data.offer.price.referenceAmount;
            var amount = data.offer.price.amount;

            if (data.catentryId === null || data.offer.published === false) {
                prod.find('.push__price').text('Produit indisponible');
            } else {
                var op = number_format(reference, 2, "|", " ").split("|")[0] + "<sup>&euro;" + number_format(reference, 2, "|", " ").split("|")[1] + "</sup>";
                var np = number_format(amount, 2, "|", " ").split("|")[0] + "<sup>&euro;" + number_format(amount, 2, "|", " ").split("|")[1] + "</sup>";

                if (reference <= amount) {
                    prod.find(".push__price").removeClass("push__price--offer");
                    prod.find(".push__old-price").removeClass("push__old-price--offer");
                    op = "";
                }else{
                    prod.find(".push__price").addClass("push__price--offer");
                    prod.find(".push__old-price").addClass("push__old-price--offer");
                }

                prod.find(".push__old-price").html(op);
                prod.find(".push__price").html(np);
            }
        },

        addToCart : function(idOffer, btn){
            var self = this;
            var url = "/webapp/wcs/stores/servlet/catalog/addToCart?catalogId=10001&storeId=10001&langId=-2&catgroupId=&catEntryId=" + idOffer;
            var prod = btn.closest(".push__item");
            var picto = btn.find(".push__cart-img");

            picto.addClass("loading");

            $j.post(url, function () {
                self.openModal({
                    "strokenprice": prod.find(".push__old-price").html(),
                    "finalprice": prod.find(".push__price").html(),
                    "image": prod.find("img").attr("data-src") || prod.find("img").attr("src"),
                    "title": prod.find(".push__name").text()
                });
            }).always(function () {
                picto.removeClass("loading");
            });
        },

        openModal : function(data) {
            var popin = '.popcart__global__resumecart__';

            $j(popin + 'imgpdt img').attr('src',data.image);
            $j(popin + 'labelpdt').text(data.title);
            $j(popin + 'pricepdt__old').html(data.strokenprice);
            $j(popin + 'pricepdt__new').html(data.finalprice);

            $j('#popcart').fadeIn();
        }
    };

    var swiperOptions = {
        speed: 400,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 32,
        loop: false,
        centeredSlides: false,
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
            1030: {
                freeMode: true
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    };

    managePushProds.init();
});