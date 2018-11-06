/*jshint esversion: 6 */

/* POLYFILL */
import "./scripts/classList_polyfill.js"
import 'intersection-observer';

/* BUBBLES */
import bubblecss from "bubbles/dist/main.css";
import bubbleCalcul from "bubbles/dist/main.js";
import bubbleAnim from "bubbles/dist/anims.js";


/* TOP SCROLLBAR */
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually
import 'simplebar/dist/simplebar.css';


import adventProds from "./scripts/advent_prods.js";

/* MAIN CSS */
import style from "./styles/style.scss";

/* SWIPER CAROUSEL */
// import Swiper from "swiper/dist/js/swiper.min.js";
// import SwiperCSS from "swiper/dist/css/swiper.css";

import paro from 'paroller.js/dist/jquery.paroller.js';

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

IntersectionObserver.prototype.USE_MUTATION_OBSERVER = false;

$j(function() {

	$j(".video__item").on("click", function(){
		$j(".video__item.current").removeClass("current");
		$j(this).addClass("current");
	});

	//Objet de gestion du menu (affichage, scroll, burger)
	$j.MENU = {
		init : function(){
			const self = this;

			self.$burger = $j(".burger__itself");
			self.$burgerFixed = $j(".burger__root").not(".burger__root--header");
			self.$menu = $j(".menu__root");
			self.$close = $j(".menu__close");

			self.isDisplay = false;

			self.events();
		},

		events : function(){
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

		openMenu : function(){
			const self = this;

			$j("html").addClass("no-scroll");
			self.$menu.addClass("show");
			self.isDisplay = !self.isDisplay;
			self.$burgerFixed.addClass("menu");
		},

		closeMenu : function(){
			const self = this;

			$j("html").removeClass("no-scroll");
			self.$menu.removeClass("show");
			self.isDisplay = !self.isDisplay;
			self.$burgerFixed.removeClass("menu");
		},

		goTo : function(e){
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

	$j.ADVENT = {
		init : function(){
			const self = this;

			self.$cals = $j(".advent__part-calendar");
			self.$calNov = $j(".advent__calendar--novembre");
			self.$calDec = $j(".advent__calendar--decembre");
			self.$tdDay = $j(".advent__calendar-table").find("td[data-date]");

			self.today = "22_12"//self.getDate();
			self.selectedDate = self.today;

			self.dataProds = [];
			self.isLoading = false;

			self.run();
		},

		run : function(){
			const self = this;

			self.setupCalendar();
			self.getData();
			self.events();
		},

		setupCalendar : function(){
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

		events : function(){
			const self = this;

			$j(".advent__calendar-month").on("click",  $j.proxy(self.toggleMonth, self));
			self.$tdDay.on("click",  $j.proxy(self.selectDate, self));
		},

		getDate : function(){
			const date = new Date();
			const day = (date.getDate() < 10)? "0"+date.getDate() : date.getDate();
			const month = (date.getMonth()+1 < 10)? "0"+date.getMonth()+1 : date.getMonth()+1;

			return day +"_"+ month;
		},

		getFullTextDate : function(date){
			const self = this;
			const day = date.split("_")[0];
			const month = date.split("_")[1];
			const today = self.$tdDay.filter(".day-current");
			const todayIndex = today.index();

			const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

			return `${jours[todayIndex]} ${((day.indexOf("0") == 0)? day.substring(1) : day)} ${(month == "11")? "novembre" : "décembre"}`;
		},

		getData : function(){
			const self = this;

			self.dataProds = adventProds;
		},

		toggleMonth : function(e){
			const self = this;
			const elm = $j(e.currentTarget);

			if(elm.parent().is(self.$calDec) && !self.$cals.hasClass("advent__calendars--dec")){
				self.$cals.addClass("advent__calendars--dec");
			}else if(elm.parent().is(self.$calNov) && self.$cals.hasClass("advent__calendars--dec")){
				self.$cals.removeClass("advent__calendars--dec");
			}
		},

		selectDate : function(e){
			const self = this;
			const item = $j(e.currentTarget);
			const itemIndex = self.$tdDay.index(item);

			if(item.hasClass("day-current") || item.hasClass("day-future")) return false;

			self.selectedDate = item.data("date");
			self.$tdDay.filter(".day-current").removeClass("day-current");
			item.addClass("day-current");
			$j(".advent__calendar-day").text(self.getFullTextDate(self.selectedDate));

			self.changeProd();
		},

		changeProd : function(){
			const self = this;
			const objData = self.dataProds[self.selectedDate];
			const newprod = self.createProd(objData);
		},

		createProd : function(data){
			const self = this;

			return `
			<div class="advent__prod-item advent__prod-item--new">
				<img src="../images/${self.selectedDate}.jpg" alt="" class="advent__prod-img">
				<p class="advent__prod-name">
					Montre connectée <b>APPLE WATCH</b> SERIES 4 40mm alu gris/noir
				</p>
				<p class="advent__prod-desc">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
				<div class="advent__prod-price">
					<span class="advent__prod-old-price">
						559€<sup>00</sup>
					</span>
					<span class="advent__prod-new-price">
						499€<sup>00</sup>
					</span>
				</div>
				<div class="advent__prod-bottom">
					<a href="" target="_blank" class="btn btn--golden">Voir le produit</a>
				</div>
			</div>
			`
		}
	};
	$j.ADVENT.init();

	new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.intersectionRatio > 0) {
				$j(entry.target).removeClass("anim");
			} else {
				// $j(entry.target).addClass("anim");
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
	})
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
	})

	var UID = {
		_current: 0,
		getNew: function(){
			this._current++;
			return this._current;
		}
	};
	HTMLElement.prototype.pseudoStyle = function(element,prop,value){
		var _this = this;
		var _sheetId = "pseudoStyles";
		var _head = document.head || document.getElementsByTagName('head')[0];
		var _sheet = document.getElementById(_sheetId) || document.createElement('style');
		_sheet.id = _sheetId;
		var className = "pseudoStyle" + UID.getNew();

		_this.className +=  " "+className;

		_sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
		_head.appendChild(_sheet);
		return this;
	};

	document.onkeydown = function(evt) {
		evt = evt || window.event;
		var isEscape = false;
		if ("key" in evt) {
			isEscape = (evt.key == "Escape" || evt.key == "Esc");
		} else {
			isEscape = (evt.keyCode == 27);
		}

		if (isEscape) {
			$j(".menu__close, .giftengine__close").trigger("click")
		}
	};
});