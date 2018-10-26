function number_format(number, decimals, decPoint, thousandsSep) {
    decimals = Math.abs(decimals) || 0;
    number = parseFloat(number);

    if (!decPoint || !thousandsSep) {
        decPoint = '.';
        thousandsSep = ',';
    }

    var roundedNumber = Math.round(Math.abs(number) * ('1e' + decimals)) + '';
    var numbersString = decimals ? (roundedNumber.slice(0, decimals * -1) || 0) : roundedNumber;
    var decimalsString = decimals ? roundedNumber.slice(decimals * -1) : '';
    var formattedNumber = "";

    while (numbersString.length > 3) {
        formattedNumber += thousandsSep + numbersString.slice(-3)
        numbersString = numbersString.slice(0, -3);
    }

    if (decimals && decimalsString.length === 1) {
        while (decimalsString.length < decimals) {
            decimalsString = decimalsString + decimalsString;
        }
    }

    return (number < 0 ? '-' : '') + numbersString + formattedNumber + (decimalsString ? (decPoint + decimalsString) : '');
};

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
    /*
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
    */
    managePushProds.init();
});