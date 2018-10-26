function isLinkClickable(link) {
	var authorize = link.parents(".box").hasClass("box--category"), // Si on est dans la box "Ajouter une catégorie"
		categoryCount = authorize && $j(".box--category .selected").length <= 2, // Si on est dans la box "Ajouter une catégorie" et qu"il y a déjà au maximum 2 paramètres de sélectionnés
		notInCategory = !authorize; // Si on est dans une autre box que "Ajouter une catégorie"
	if (link.hasClass("selected") || categoryCount || notInCategory) {
		return true;
	}
}

/* On bloque le scroll de la page si le layout est affiché */
function scrollingLayout() {
	if (location.hash === "#engine") {
		$j("body,html").addClass("overflowFix");
	} else {
		$j(".overflowFix").removeClass("overflowFix");
	}
}

function getProducts() {
	$j(".giftengine__close").trigger("click");
	$j(".container-center .header__cta-container").stop(true, true).slideUp(function () { /* $j(this).remove(); */ });
	/*
	var o = {
		type: "",
		category: [],
		pricerange: ""
	};
	$j('.box--type .selected').each(function () {o.type = $j(this).data("value");});
	$j('.box--category .selected').each(function () {o.category.push($j(this).data("value"));});
	$j('.box--pricerange .selected').each(function () {o.pricerange = $j(this).data("value");});
	*/
	if(!$j(".gift__params").length) {
		$j('<div class="gift"><div class="gift__header"><div class="gift__title">Votre sélection</div><div class="gift__params"><div class="gift__paramsType"></div><div class="gift__paramsCategory"></div><div class="gift__paramsPricerange"></div></div><a href="#engine" class="gift__edit btn btn--big">Faire une nouvelle recherche</a></div><div class="gift__content"></div></div>').insertAfter(".header__title").hide().slideDown();
	}
	$j(".gift__params > div").html('');
	$j('.box--type .selected').clone().appendTo(".gift__paramsType");
	$j('.box--category .selected').clone().appendTo(".gift__paramsCategory");
	$j('.box--pricerange .selected').clone().appendTo(".gift__paramsPricerange");
	$j('.gift .link.selected').removeClass('selected');
	// TODO => ON CHARGE LES PRODUITS
}

function engine(e) {
	var target = $j(e.currentTarget),
		event = e.type,
		close = target.hasClass("giftengine__close"),
		submit = target.hasClass("giftengine__submit") && !target.attr("disabled"),
		link = target.hasClass("link");
	if (event === "click") {
		if (submit) {
			getProducts();
		} else if (close) {
			location.hash = "";
		} else if (link) {

			/* Règles de gestion */
			if (target.parents(".box").hasClass("box--pricerange")) {
				$j(".box--pricerange .link").removeClass("selected");
			} else if (target.parents(".box").hasClass("box--category")) {
				if (target.data("value") === "all") {
					$j(".box--category .link").removeClass("selected");
				} else if($j(".box--category .link[data-value='all']").hasClass("selected")){
					$j(".box--category .link[data-value='all']").removeClass("selected");
				}
			} else if (target.parents(".box").hasClass("box--type")) {
				$j(".box--type .link").removeClass("selected");
			}

			/* Activation du lien */
			if (isLinkClickable(target)) {
				target.removeClass("hover");
				target.toggleClass("selected");
			} else {
				$j(".box__title small").removeAttr("class");
				setTimeout(function () {
					$j(".box__title small").addClass("alert");
				}, 10);
			}

			/* Contrôle de surface */
			if (($j(".box--type .selected").length >= 1) && ($j(".box--category .selected").length >= 1) && ($j(".box--pricerange .selected").length >= 1)) {
				$j(".giftengine__error").stop(true, true).slideUp();
				$j(".giftengine__submit").removeAttr("disabled");
			} else {
				$j(".giftengine__error").stop(true, true).slideDown();
				$j(".giftengine__submit").attr("disabled", "disabled");
			}

		}
	} else if (event === "mouseenter") {
		if (target.hasClass("link")) {
			if (isLinkClickable(target)) {
				target.addClass("hover");
			}
		}
	} else if (event === "mouseleave") {
		if (target.hasClass("link")) {
			if (isLinkClickable(target)) {
				target.removeClass("hover");
			}
		}
	}
}

function init() { // On déplace le moteur à cadeaux dans le body pour le Zindex
	$j("#engine").detach().appendTo("body").detach().appendTo("body");
	$j(".giftengine__close, .giftengine__submit, .giftengine button.link").click(function (e) {
		engine(e);
	});
	$j(".giftengine button.link").hover(function (e) {
		engine(e);
	});
	$j('.gift__edit').click(function(){
		engine(e);
	});
	$j(window).on("hashchange", function () {
		scrollingLayout();
	});
	scrollingLayout();
}
$j(function () {
	init();
});