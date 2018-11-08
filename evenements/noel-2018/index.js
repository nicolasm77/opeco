/*jshint esversion: 6 */

/* POLYFILL */
import classlist from "./scripts/classList_polyfill.js";
import interObserver from 'intersection-observer';
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = false;

/* BUBBLES */
import bubblecss from "bubbles/dist/main.css";
import bubbleCalcul from "bubbles/dist/main.js";
import bubbleAnim from "bubbles/dist/anims.js";


/* TOP SCROLLBAR */
import simplebar from "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually
import simplebarcss from "simplebar/dist/simplebar.css";

/* CALENDRIER DE L'AVENT */
import adventProds from "./scripts/advent_prods.js";

/* MAIN CSS */
import style from "./styles/style.scss";

/*
SWIPER CAROUSEL
import Swiper from "swiper/dist/js/swiper.min.js";
import SwiperCSS from "swiper/dist/css/swiper.css";
*/

/* PARALLAX */
// import paro from "paroller.js/dist/jquery.paroller.js";
import paro from "./scripts/parallax.js";

/* GIFENGINE */
import _ from "lodash";
import giftengine from "./scripts/giftengine.js";

/* PUSHES PRODUCTS */
import products from "./scripts/products.js";

/* GO TO TOP */
import gototop from "./scripts/gototop.js";

/* XITI CALLS */
import xiti from "../../_global/scripts/data-xiti.js";


/* LAZY LOAD */
import lazy from "lazysizes";
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.srcAttr = 'data-lazy';
window.lazySizesConfig.expand = 350;


$j(function() {
	/* Objet de gestion du menu (affichage, scroll, burger) */
	$j.MENU = {
		init: function(){
			const self = this;

			self.$burger = $j(".burger__itself");
			self.$burgerFixed = $j(".burger__root").not(".burger__root--header");
			self.$menu = $j(".menu__root");
			self.$close = $j(".menu__close");

			self.isDisplay = false;

			self.events();
		},

		events: function(){
			const self = this;

			self.$burger.on("click", $j.proxy(self.openMenu, self));
			self.$close.on("click", $j.proxy(self.closeMenu, self));
			self.$menu.find(".menu__link").on("click", $j.proxy(self.goTo, self));

			new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.intersectionRatio > 0) {
						self.$burgerFixed.removeClass("fixed");
					} else {
						self.$burgerFixed.addClass("fixed");
					}
				});
			}).observe($j(".burger__root--header").get(0));

			const sectionObs = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.intersectionRatio >= 0.30) {
						$j(".menu__link").removeClass("current").filter("[href=#"+entry.target.id+"]").addClass("current");
					}
				});
			}, {threshold: [0.30]});
			$j("section[id]").get().forEach(section => {
				sectionObs.observe(section);
			});
		},

		openMenu: function(e){
			e.preventDefault();

			const self = this;

			$j("html").addClass("no-scroll");
			self.$menu.addClass("show");
			self.isDisplay = !self.isDisplay;
			self.$burgerFixed.addClass("menu");
		},

		closeMenu: function(){
			const self = this;

			$j("html").removeClass("no-scroll");
			self.$menu.removeClass("show");
			self.isDisplay = !self.isDisplay;
			self.$burgerFixed.removeClass("menu");
		},

		goTo: function(e){
			e.preventDefault();
			const self = this;
			const scroll = $j(window).scrollTop();
			const wHeight = $j("#contenuhome").height();
			const target = $j(e.currentTarget).attr("href");
			const targetTop = (target === "#section-faire-plaisir")? $j(target).offset().top -80 : $j(target).offset().top;

			self.closeMenu();

			$j('html, body').delay(150).animate({
				scrollTop : targetTop
			}, Math.max(250, 2500*Math.abs(targetTop - scroll)/wHeight));
		}
	};
	$j.MENU.init();

	$j.VIDEO = {
		init: function(){
			const self = this;

			self.$container = $j(".video__container-video");
			self.$items = $j(".video__item");

			self.events();
		},

		events: function(){
			const self = this;

			self.$items.on("click", $j.proxy(self.changeVideo, self));

			$j(window).on("load", function(){
				self.$container.append(self.makeIframe(self.$items.eq(0).data("yt"), ""));
			});
		},

		changeVideo: function(e){
			const self = this;
			const elm = $j(e.currentTarget);
			const iframe = self.makeIframe(elm.data("yt"), "?autoplay=1");

			if(!elm.hasClass("current")){
				self.$items.filter(".current").removeClass("current");
				elm.addClass("current");

				self.$container.children().remove();
				self.$container.append(iframe);
			}
		},

		makeIframe: function(yt, auto){
			return `<iframe class="video__itself" width="560" height="315" src="https://www.youtube.com/embed/${yt}${auto}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
		}
	};
	$j.VIDEO.init();

	$j.ADVENT = {
		init: function(){
			const self = this;

			self.$cals = $j(".advent__part-calendar");
			self.$calNov = $j(".advent__calendar--novembre");
			self.$calDec = $j(".advent__calendar--decembre");
			self.$tdDay = $j(".advent__calendar-table").find("td[data-date]");

			self.today = "24_12";
			self.selectedDate = self.today;

			self.dataProds = [];
			self.isLoading = false;
			self.firstLoading = true;

			self.run();
		},

		run: function(){
			const self = this;

			self.setupCalendar();
			self.getData();
			self.events();
		},

		setupCalendar: function(){
			const self = this;
			let today = self.$tdDay.filter("[data-date="+self.today+"]");
			let todayIndex = self.$tdDay.index(today);

			if(!today.length) {
				today = self.$tdDay.eq(0);
				todayIndex = self.$tdDay.index(today);
				self.today = today.data("date");
			}

			today.addClass("day-current");
			self.$tdDay.slice(todayIndex+1).addClass("day-future");
			$j(".advent__calendar-day").text(self.getFullTextDate(self.today));

			if(self.today.split("_")[1] == "12") self.$cals.addClass("advent__calendars--dec");
		},

		events: function(){
			const self = this;

			$j(".advent__calendar-month").on("click",  $j.proxy(self.toggleMonth, self));
			self.$tdDay.on("click",  $j.proxy(self.selectDate, self));
		},

		getDate: function(){
			const date = new Date();
			const day = (date.getDate() < 10)? "0"+date.getDate() : date.getDate();
			const month = (date.getMonth()+1 < 10)? "0"+date.getMonth()+1 : date.getMonth()+1;

			return day +"_"+ month;
		},

		getFullTextDate: function(date){
			const self = this;
			const day = date.split("_")[0];
			const month = date.split("_")[1];
			const today = self.$tdDay.filter(".day-current");
			const todayIndex = today.index();

			const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

			return `${jours[todayIndex]} ${((day.indexOf("0") == 0)? day.substring(1) : day)} ${(month == "11")? "novembre" : "décembre"}`;
		},

		getData: function(){
			const self = this;

			if (location.hostname !== "localhost") {
				$j.getJSON("/content/static/bcom/evenements/2018/12_noel-2018/advent_prods.json", function (json) {
					self.dataProds = json[0];
					self.changeProd();
				});
			}else{
				self.dataProds = adventProds[0];
				self.changeProd();
			}
		},

		toggleMonth: function(e){
			const self = this;
			const elm = $j(e.currentTarget);

			if(elm.parent().is(self.$calDec) && !self.$cals.hasClass("advent__calendars--dec")){
				self.$cals.addClass("advent__calendars--dec");
			}else if(elm.parent().is(self.$calNov) && self.$cals.hasClass("advent__calendars--dec")){
				self.$cals.removeClass("advent__calendars--dec");
			}
		},

		selectDate: function(e){
			const self = this;
			const item = $j(e.currentTarget);
			const itemIndex = self.$tdDay.index(item);

			if(item.hasClass("day-current") || item.hasClass("day-future")) return false;

			self.selectedDate = item.data("date");
			self.$tdDay.filter(".day-current").removeClass("day-current");
			item.addClass("day-current");

			/* $j(".advent__calendar-day").text(self.getFullTextDate(self.selectedDate)); */

			if(self.dataProds.length !== 0){
				self.changeProd();
			}
		},

		changeProd: function(){
			const self = this;
			const objData = self.dataProds[self.selectedDate];
			const newprod = self.createProd(objData);

			$j(".advent__part-prod").addClass("loading").append(newprod).css({minHeight: $j(".advent__prod-item").height()});
			$j(".advent__prod-item").not(".advent__prod-item--new").addClass("advent__prod-item--old");

			if (location.hostname !== "localhost") {
				if(intersec($j(".advent__part-prod"), 150) || self.firstLoading){
					self.getPrices($j(".advent__prod-item--new"), function(){
						$j(".advent__part-prod").removeClass("loading");
						$j(".advent__prod-item--new").removeClass("advent__prod-item--new");
						$j(".advent__prod-item--old").remove();
					});
				}else{
					self.getPrices($j(".advent__prod-item--new"), function(){});
					$j('html, body').animate({scrollTop : $j(".advent__part-prod").offset().top - 40 - 30}, 450, function(){
						$j(".advent__part-prod").removeClass("loading");
						$j(".advent__prod-item--new").removeClass("advent__prod-item--new");
						$j(".advent__prod-item--old").remove();
					});
				}
			}else{
				if(intersec($j(".advent__part-prod"), 150) || self.firstLoading){
					setTimeout(function(){
						$j(".advent__part-prod").removeClass("loading");
						$j(".advent__prod-item--new").removeClass("advent__prod-item--new");
						$j(".advent__prod-item--old").remove();
					}, 300);
				}else{
					$j('html, body').animate({scrollTop : $j(".advent__part-prod").offset().top - 40 - 30}, 450, function(){
						$j(".advent__part-prod").removeClass("loading");
						$j(".advent__prod-item--new").removeClass("advent__prod-item--new");
						$j(".advent__prod-item--old").remove();
					});
				}
			}

			self.firstLoading = false;
		},

		createProd: function(data){
			const self = this;
			const path = "/content/static/bcom/evenements/2018/12_noel-2018/assets/img_advent/";

			/* const path = "img_advent/"; */

			return `
			<div class="advent__prod-item advent__prod-item--new" data-offer="${data.o}">
				<div class="advent__prod-container">
					<div class="advent__prod-subcontainer">
						${(data => {
							if(data.v && document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"') == "probably"){
								return `<video muted loop autoplay src="${path}${self.selectedDate.replace("_", "-")}.mp4" class="advent__prod-img"></video>`;
							}else{
								return `<img src="${path}${self.selectedDate.replace("_", "-")}.jpg" class="advent__prod-img lazyload">`;
							}
						})(data)}
					</div>
				</div>
				<p class="advent__prod-name">
					${data.n}
				</p>
				<p class="advent__prod-desc">
					${data.d}
				</p>
				<div class="advent__prod-price">
					<span class="advent__prod-old-price">
						&nbsp;<sup>&nbsp;</sup>
					</span>
					<span class="advent__prod-new-price">
						&nbsp;<sup>&nbsp;</sup>
					</span>
				</div>
				<div class="advent__prod-bottom">
					<a href="/ref/${data.r}" target="_blank" class="btn btn--golden" data-xiti="Portail::Noel_2018::1jour_1cadeau::voir_le_produit">Voir le produit</a>
				</div>
			</div>
			`;
		},

		getPrices: function(prod, callback){
            const self = this;
            const cat = prod.attr("data-offer");
			const url = "/webapp/wcs/stores/servlet/BLGetDynamicOffer?leadOfferCatentryId=" + cat + "&storeId=10001&catalogId=10001&langId=-2";

            $j.getJSON(url, function (data) {
				self.updateProdHtml(prod, data);

				callback();
			});
		},

        updateProdHtml: function(prod, data){
			if(!data.offer) return false;

            var reference = data.offer.price.referenceAmount;
			var amount = data.offer.price.amount;

            if (data.catentryId === null || data.offer.published === false) {
                prod.find('.advent__prod-new-price').text('Produit indisponible');
            } else {
                var op = number_format(reference, 2, "|", " ").split("|")[0] + "&euro;<sup>" + number_format(reference, 2, "|", " ").split("|")[1] + "</sup>";
                var np = number_format(amount, 2, "|", " ").split("|")[0] + "&euro;<sup>" + number_format(amount, 2, "|", " ").split("|")[1] + "</sup>";
                if (reference <= amount) {
                    prod.find(".advent__prod-new-price").removeClass("advent__prod-new-price--offer");
                    prod.find(".advent__prod-old-price").removeClass("advent__prod-old-price--offer");
                    op = "";
                }else{
                    prod.find(".advent__prod-new-price").addClass("advent__prod-new-price--offer");
                    prod.find(".advent__prod-old-price").addClass("advent__prod-old-price--offer");
                }
                prod.find(".advent__prod-old-price").html(op);
                prod.find(".advent__prod-new-price").html(np);
            }
        },
	};
	$j.ADVENT.init();

	function intersec(elm, margin){
		const offset = elm.offset().top;
		const wHeight = $j(window).height();
		const top = $j(window).scrollTop();

		return (offset+margin)<(top + wHeight);
	}

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
			formattedNumber += thousandsSep + numbersString.slice(-3);
			numbersString = numbersString.slice(0, -3);
		}
		if (decimals && decimalsString.length === 1) {
			while (decimalsString.length < decimals) {
				decimalsString = decimalsString + decimalsString;
			}
		}
		return (number < 0 ? '-' : '') + numbersString + formattedNumber + (decimalsString ? (decPoint + decimalsString) : '');
	}

	new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.intersectionRatio > 0) {
				$j(entry.target).removeClass("anim");
			} else {
				/* $j(entry.target).addClass("anim"); */
			}
		});
	}).observe($j(".plaisir__root").get(0));

	$j("body").append('<a href="#container" class="gototop"><span>Haut<br>de page</span></a>');
	$j(".gototop").on("click", function(e){
		e.preventDefault();
		const scroll = $j(window).scrollTop();
		const wHeight = $j("#container").height();
		const targetTop = 0;

		$j('html, body').animate({
			scrollTop : 0
		}, Math.max(200, 1500*Math.abs(targetTop - scroll)/wHeight));
	});

	window.oldScroll = window.scrollY;

	$j(window).on("scroll", function(e) {
		if(this.scrollY < 5){
			$j(".gototop").removeClass("gototop--show");
		}else if(Math.abs(this.oldScroll - this.scrollY) > 1){
			if(this.oldScroll > this.scrollY){
				$j(".gototop").addClass("gototop--show");
			}else{
				$j(".gototop").removeClass("gototop--show");
			}
			this.oldScroll = this.scrollY;
		}
	});

	/*
	// var UID = {
	// 	_current: 0,
	// 	getNew: function(){
	// 		this._current++;
	// 		return this._current;
	// 	}
	// };
	// HTMLElement.prototype.pseudoStyle = function(element,prop,value){
	// 	var _this = this;
	// 	var _sheetId = "pseudoStyles";
	// 	var _head = document.head || document.getElementsByTagName('head')[0];
	// 	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	// 	_sheet.id = _sheetId;
	// 	var className = "pseudoStyle" + UID.getNew();

	// 	_this.className +=  " "+className;

	// 	_sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
	// 	_head.appendChild(_sheet);
	// 	return this;
	// };
	*/

	document.onkeydown = function(evt) {
		evt = evt || window.event;
		var isEscape = false;
		if ("key" in evt) {
			isEscape = (evt.key == "Escape" || evt.key == "Esc");
		} else {
			isEscape = (evt.keyCode == 27);
		}

		if (isEscape) {
			$j(".menu__close, .giftengine__close").trigger("click");
		}
	};
});
