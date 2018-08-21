var closeModal,
  	openModal,
  	getPrices,
  	product= new Object();


closeModal = function() {
	$j('#popcart').fadeOut();
};

openModal = function(o) {
	var pop = '.popcart__global__resumecart__';
	$j(pop + 'imgpdt img').attr('src',o.image);
	$j(pop + 'labelpdt').text(o.title);
	$j(pop + 'pricepdt__old').html(o.strokenprice);
	$j(pop + 'pricepdt__new').html(o.finalprice);
	$j('#popcart').fadeIn();
};

getPrices = function(){
	$j('.bien-ensemble__deals__product').each(function(){
		var cat = $j(this).attr('data-offer');
		$j.getJSON('/webapp/wcs/stores/servlet/BLGetDynamicOffer?leadOfferCatentryId='+cat+'&storeId=10001&catalogId=10001&langId=-2',function(data){
			var current = ".bien-ensemble__deals__product[data-offer=\""+cat+"\"]",
				reference = data.offer.price.referenceAmount,
				amount = data.offer.price.amount;
			if (data.catentryId === null || data.offer.published === false) {
				$j(current).remove();
			} else {
				var	op = accounting.formatMoney(reference, "", 2, " ", "&euro;").split("&euro;")[0] + "<sup>&euro;" + accounting.formatMoney(reference, "", 2, " ", "&euro;").split("&euro;")[1] + "</sup>";
				var np = accounting.formatMoney(amount, "", 2, " ", "&euro;").split("&euro;")[0] + "<sup>&euro;" +accounting.formatMoney(amount, "", 2, " ", "&euro;").split("&euro;")[1] + "</sup>";
				if (reference <= amount) {op = "";}
				$j(current + ' .bien-ensemble__deals__product__old_price').html(op);
				$j(current + ' .bien-ensemble__deals__product__price').html(np);
			}
		});
	});
};

addToCart = function(value,current){
	var e = '/webapp/wcs/stores/servlet/catalog/addToCart?catalogId=10001&storeId=10001&langId=-2&catgroupId=&catEntryId=' + value, t=$j(current), y=t.parents('.swiper-slide');
	t.addClass('loading');
	$j.post(e, function () {
		$j(current).removeClass('loading');
		product = {
			'strokenprice' : y.find('.bien-ensemble__deals__product__old_price').html(),
			'finalprice' : y.find('.bien-ensemble__deals__product__price').html(),
			'image' : y.find('.bien-ensemble__deals__product img').attr('src'),
			'title' : y.find('.bien-ensemble__deals__product__name span').text()
		};
		openModal(product);
	}).error(function(){
		t.removeClass('loading');
	});
};

$j(function(){
	var userHasScrolled = false;
	window.onscroll = function (e) {
		userHasScrolled = true;
	}
	if( document.location.hash === ''){
		// ScrollTo
		setTimeout(function(){
			if(userHasScrolled === false){
				$j('html, body').animate({
					scrollTop: $j('.bien-ensemble').offset().top
				}, 500);
			}
		},1800);
	}


  $j('.bien-ensemble__deals__product').click(function() {
    //
  }).find('.bien-ensemble__deals__product__cart').click(function(e) {
    addToCart($j(this).closest('article').attr('data-offer'),this);
    return false;
  });

});
