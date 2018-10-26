/*jshint esversion: 6 */

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

		// ${mavar}


		$j.removeAccent = function(str){
			str = str
				.replace(new RegExp(/Ç/, "g"), 'C')
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

		/*
			${prod["code réf"]}
			${prod["data-officer-id"]}
			${prod["Type"]}
			${prod["Marque"]}
			${prod["Produit"]}
			${$.removeAccent(prod["Type"])}
			${$.removeAccent(prod["Marque"])}
			${$.removeAccent(prod["Produit"])}
			${prod["code réf"]}
			${prod["EAN"]}
			${note}
		*/

		var html = `<div class="push">
			<article class="push__item" data-ref="1079601" data-offer="1064724">
				<a href="/ref/1079601" title="Simulateur d'Aube PHILIPS JNDSNBG8" data-xiti="Portail::Noel2018::Push_Produits::SimulateurdAube_Philips__dkrjg54ujd">
					<span class="push__img">
						<img class="lazyload" src="https://boulanger.scene7.com/is/image/Boulanger/8710103783367_h_f_l_0?fit=constrain,1&amp;wid=230&amp;hei=230&amp;fmt=png&amp;qlt=100" alt="Simulateur d'Aube PHILIPS JNDSNBG8" >
					</span>
					<span class="hub-grow"></span>
					<span class="push__promo">30€ REMBOURSES</span><span class="hub-grow"></span>
					<span class="push__name">
						<span>Simulateur d'aube <strong>PHILIPS</strong> JHNIKEDUJ4</span>
					</span>
					<span class="push__ratings">
						<img src="${require('../images/pushproducts/ratings.svg')}" alt="">
						<span style="width:20%;"></span>
					</span>
					<span class="push__bottom">
						<span class="push__bottom-left">
							<span class="push__old-price"></span>
							<span class="push__price"></span>
						</span>
						<span class="push__bottom-right">
							<span class="push__cart" data-xiti="Ajouts_Paniers::Portail::Noel2018::SimulateurdAube_Philips__dkrjg54ujd">
								<span class="push__cart-img"></span>
								<span class="push__cart-txt">Ajouter au panier</span>
							</span>
						</span>
					</span>
				</a>
			</article>
		</div>`;
		html= html+html+html+html+html+html+html+html+html;

		$j('<div class="engine__products"></div>').insertAfter(".header__title").hide().slideDown();
		$j(".engine__products").append(html);
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