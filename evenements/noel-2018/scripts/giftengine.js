/*jshint esversion: 6 */
var moreProductIndex = 0;
var currentServiceShowed = 0;
var currentProductIndex = 0;
var verifiedProducts = [];
var allProducts = {};
var selectedParams = {};
$j.sanitize = function (str) {
	str = str.replace(new RegExp(/Ç/, "g"), 'C')
		.replace(new RegExp(/ç/, "g"), 'c')
		.replace(new RegExp(/è|é|ê|ë/, "g"), 'e')
		.replace(new RegExp(/È|É|Ê|Ë/, "g"), 'E')
		.replace(new RegExp(/à|á|â|ã|ä|å/, "g"), 'a')
		.replace(new RegExp(/À|Á|Â|Ã|Ä|Å/, "g"), 'A')
		.replace(new RegExp(/ì|í|î|ï/, "g"), 'i')
		.replace(new RegExp(/Ì|Í|Î|Ï/, "g"), 'I')
		.replace(new RegExp(/ð|ò|ó|ô|õ|ö/, "g"), 'o')
		.replace(new RegExp(/Ò|Ó|Ô|Õ|Ö/, "g"), 'O')
		.replace(new RegExp(/ù|ú|û|ü/, "g"), 'u')
		.replace(new RegExp(/Ù|Ú|Û|Ü/, "g"), 'U')
		.replace(new RegExp(/ý|ÿ/, "g"), 'y')
		.replace(new RegExp(/Ý/, "g"), 'Y')
		.replace(new RegExp(" ", "g"), "_")
		.toUpperCase();
	return (str);
};

function isLinkClickable(link) {
	var authorize = link.parents(".box").hasClass("box--category"), // Si on est dans la box "Ajouter une catégorie"
		categoryCount = authorize && $j(".box--category .selected").length <= 2, // Si on est dans la box "Ajouter une catégorie" et qu"il y a déjà au maximum 2 paramètres de sélectionnés
		notInCategory = !authorize; // Si on est dans une autre box que "Ajouter une catégorie"
	if (link.hasClass("selected") || categoryCount || notInCategory) {
		return true;
	}
}

function productsHtml(object, more) {
	var inject = "";
	for (var i = 0; i < object.length; i++) {
		var o = object[i];
		var odr = "";
		var rating = "";
		var xiti = $j.sanitize(o.name);
		var nameWithoutTags = o.name.replace("<b>", "").replace("</b>", "");

		if (typeof o.odr !== "undefined") {
			odr = '<span class="push__promo">' + o.odr + '</span><span class="hub-grow"></span>';
		} else {
			odr = '<span class="push__promo noborder"></span><span class="hub-grow"></span>';
		}
		if (typeof o.rating !== "undefined") {
			rating = `<span class="push__ratings"><img src="${require('../images/products/ratings.svg')}" alt=""><span style="width:${o.rating}%;"></span></span>`;
		} else {
			rating = `<span class="push__ratings norating"><img src="${require('../images/products/ratings.svg')}" alt=""><span></span></span>`;
		}
		inject +=
			`<div class="push">
			<article class="push__item" data-ref="${o.ref}" data-offer="${o.offerId}">
				<a href="${o.ref}" title="${nameWithoutTags}" data-xiti="Portail::Noel2018::Push_Produits::${xiti}">
					<span class="push__img">
						<img class="lazyload" src="https://boulanger.scene7.com/is/image/Boulanger/${o.ean}_h_f_l_0?fit=constrain,1&amp;wid=230&amp;hei=230&amp;fmt=png&amp;qlt=100" alt="${nameWithoutTags}" >
					</span>
					<span class="hub-grow"></span>
					${odr}
					<span class="push__name">
					<span>${o.name}</span>
					<span class="hub-grow"></span>
					</span>
					${rating}
					<span class="push__bottom">
						<span class="push__bottom-left">
							<span class="push__old-price"></span>
							<span class="push__price"></span>
						</span>
						<span class="push__bottom-right">
							<span class="push__cart" data-xiti="Ajouts_Paniers::Portail::Noel2018::${xiti}">
								<span class="push__cart-img"></span>
								<span class="push__cart-txt">Ajouter au panier</span>
							</span>
						</span>
					</span>
				</a>
			</article>
		</div>`;
		if (i === 3) {
			inject += '<div class="push push__service service__item--sim-col">' + $j('.service__item[data-increment-order=' + currentServiceShowed + ']').html() + '</div>';
			if (currentServiceShowed === 2) {
				currentServiceShowed = 0;
			} else {
				currentServiceShowed++;
			}
		}
		if (i === object.length - 1) {
			$j(".gift__content").append(inject);
			$j('.push.push__service .service__block:not(.conditionsAdded)').append('<span class="service__conditions">voir conditions</span>').addClass("conditionsAdded");
			if (typeof more === "undefined") {
				window.scrollTo(0, $j(".gift__edit").offset().top - 35);
			}
			moreChecker(currentProductIndex);
		}
	}
}

function moreChecker(index) {
	index = index + 1;
	for (var k = index; k <= allProducts.responseJSON.length; k++) {
		var data = allProducts.responseJSON[k];
		if (validType(data) && validCategory(data) && validPrice(data)) {
			$j(".gift__footer__more").show();
			return true;
		} else {
			$j(".gift__footer__more").hide();
		}
	}
}

function validType(product) {
	for (var i = 0; i < 4; i++) {
		if (typeof product.type !== "undefined") {
			if (product.type[i] === selectedParams.type) {
				return true;
			}
		}
	}
}

function validCategory(product) {
	if (selectedParams.category[0] !== "all") {
		if (typeof product.category !== "undefined") {
			if (_.intersection(product.category, selectedParams.category).length) {
				return true;
			}
		}
	} else {
		return true;
	}
}

function validPrice(product) {
	if (selectedParams.pricerange !== "all") {
		if (typeof product.price !== "undefined") {
			switch (selectedParams.pricerange) {
				case "less_30":
					if (product.price < 30) {
						return true;
					}
					break;
				case "less_50":
					if (product.price < 50) {
						return true;
					}
					break;
				case "less_100":
					if (product.price < 100) {
						return true;
					}
					break;
				case "between100_200":
					if (product.price >= 100 && product.price < 200) {
						return true;
					}
					break;
				case "more_200":
					if (product.price >= 200) {
						return true;
					}
					break;
			}
		}
	} else {
		return true;
	}
}

function productsCheck(more) {

	if (currentProductIndex <= allProducts.responseJSON.length) {
		var product = allProducts.responseJSON[currentProductIndex];

		if (typeof product !== "undefined" && verifiedProducts.length < 8) {
			if (validType(product) && validCategory(product) && validPrice(product)) {
				verifiedProducts.push(product);
			}
			if (currentProductIndex + 1 === allProducts.responseJSON.length) {
				$j(".gift__footer__more").hide();
			}
			currentProductIndex++;
			productsCheck(more);
		} else {
			console.warn(verifiedProducts, 'END');
			productsHtml(verifiedProducts, more);
			$j(".push__item:not('.priced')").each(function () {
				if (location.hostname !== "localhost") {
					$j.managePushProds.getPrices($j(this));
				}
			});
			verifiedProducts = [];
		}
	}
}

function surfaceControl() {

	/* CONTRÔLE DE SURFACE */
	if (($j(".box--type .selected").length >= 1) && ($j(".box--category .selected").length >= 1) && ($j(".box--pricerange .selected").length >= 1)) {
		$j(".giftengine__error").stop(true, true).slideUp();
		$j(".giftengine__submit").removeAttr("disabled");
	} else {
		$j(".giftengine__error").stop(true, true).slideDown();
		$j(".giftengine__submit").attr("disabled", "disabled");
	}

}

function init() {

	var engineLayer = {

		/* On bloque le scroll de la page si le layout est affiché */
		open: function () {
			$j("body,html").addClass("overflowFix");
			$j(".layout#engine").fadeIn(function () {

				/* On réceptionne tous les produits */
				if (!Object.keys(allProducts).length) {
					// allProducts = $j.getJSON("scripts/products.json", function (data) {
					allProducts = $j.getJSON("/content/static/bcom/evenements/2018/12_noel-2018/prods_noel2018.json", function (data) {
						return data;
					});
				}
			});
		},

		/* On bloque le scroll de la page si le layout est affiché */
		close: function () {
			$j(".layout#engine").fadeOut(function () {
				$j(".overflowFix").removeClass("overflowFix");
			});
		}
	};

	/* On déplace le moteur à cadeaux dans le body pour le Zindex */
	$j("#engine").detach().appendTo("body").detach().appendTo("body");

	$j("body").on("click", ".giftengine__submit", function () {

		if (!$j(this).attr("disabled")) {
			engineLayer.close();
			var arr = [];
			currentProductIndex = 0;
			verifiedProducts = [];
			$j('.box--category .selected').each(function () {
				arr.push($j(this).data('value'));
			});
			$j(".gift__content,.gift__params > div").html('');
			$j(".header__container .header__cta-container").hide();
			$j('.header__container .gift').show();
			$j('.box--type .selected').clone().appendTo(".gift__paramsType");
			$j('.box--category .selected').clone().appendTo(".gift__paramsCategory");
			$j('.box--pricerange .selected').clone().appendTo(".gift__paramsPricerange");
			$j('.gift .link.selected').removeClass('selected');
			selectedParams = {
				type: $j('.box--type .selected').data('value'),
				pricerange: $j('.box--pricerange .selected').data('value'),
				category: arr
			};
			productsCheck();
		}

	}).on("click", ".giftengine__close", function () {
		engineLayer.close();
	}).on("click", ".box button.link", function () {

		var link = $j(this);

		/* RÈGLES DE GESTION */
		if (link.parents(".box").hasClass("box--pricerange")) {
			$j(".box--pricerange .link").removeClass("selected");
		} else if (link.parents(".box").hasClass("box--category")) {
			if (link.data("value") === "all") {
				$j(".box--category .link").removeClass("selected");
			} else if ($j(".box--category .link[data-value='all']").hasClass("selected")) {
				$j(".box--category .link[data-value='all']").removeClass("selected");
			}
		} else if (link.parents(".box").hasClass("box--type")) {
			$j(".box--type .link").removeClass("selected");
		}

		/* ACTIVATION DU LIEN */
		if (isLinkClickable(link)) {
			link.removeClass("hover").toggleClass("selected");
		} else {
			$j(".box__title small").removeAttr("class");
			setTimeout(function () {
				$j(".box__title small").addClass("alert");
			}, 10);
		}

		/* CONTRÔLES DE SURFACE */
		surfaceControl();

	}).on("click", ".gift__footer__more", function () {
		productsCheck(1);
	}).on("click", ".header__cta-btn, .gift__edit", function () {
		engineLayer.open();
	});

	$j("button.link").hover(function () {
		if (isLinkClickable($j(this)) && !$j(this).hasClass('selected')) {
			$j(this).toggleClass("hover");
		}
	});

	if (location.hash === "#engine") {
		engineLayer.open();
	}

}

$j(function () {
	init();
});
