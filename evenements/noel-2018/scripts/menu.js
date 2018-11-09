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

		self.$burger.on("click touchend", $j.proxy(self.openMenu, self));
		self.$close.on("click touchend", $j.proxy(self.closeMenu, self));
		self.$menu.find(".menu__link").on("click touchend", $j.proxy(self.goTo, self));

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